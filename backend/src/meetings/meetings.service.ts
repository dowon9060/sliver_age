import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';
import { MeetingParticipant } from './entities/meeting-participant.entity';
import { MeetingPayment } from './entities/meeting-payment.entity';
import { MeetingReview } from './entities/meeting-review.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { RatingsService } from '../ratings/ratings.service';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    @InjectRepository(MeetingParticipant)
    private participantsRepository: Repository<MeetingParticipant>,
    @InjectRepository(MeetingPayment)
    private paymentsRepository: Repository<MeetingPayment>,
    @InjectRepository(MeetingReview)
    private reviewsRepository: Repository<MeetingReview>,
    private ratingsService: RatingsService,
  ) {}

  async create(hostId: number, createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const meeting = this.meetingsRepository.create({
      ...createMeetingDto,
      hostId,
      currentParticipants: 1, // 주최자 포함
    });
    const savedMeeting = await this.meetingsRepository.save(meeting);

    // 주최자를 자동으로 참여자로 추가
    await this.participantsRepository.save({
      meetingId: savedMeeting.id,
      userId: hostId,
      status: 'confirmed',
    });

    return this.findById(savedMeeting.id);
  }

  async findAll(filters?: any): Promise<Meeting[]> {
    const query = this.meetingsRepository
      .createQueryBuilder('meeting')
      .leftJoinAndSelect('meeting.location', 'location')
      .leftJoinAndSelect('meeting.host', 'host')
      .leftJoinAndSelect('host.profile', 'hostProfile')
      .where('meeting.status = :status', { status: 'open' });

    if (filters?.locationId) {
      query.andWhere('meeting.locationId = :locationId', { locationId: filters.locationId });
    }

    return query.orderBy('meeting.meetingDateTime', 'ASC').getMany();
  }

  async findById(id: number): Promise<Meeting> {
    return this.meetingsRepository.findOne({
      where: { id },
      relations: ['location', 'host', 'host.profile', 'participants', 'participants.user', 'participants.user.profile'],
    });
  }

  async join(userId: number, meetingId: number): Promise<MeetingParticipant> {
    const meeting = await this.findById(meetingId);

    if (!meeting) {
      throw new NotFoundException('소모임을 찾을 수 없습니다');
    }

    if (meeting.status !== 'open') {
      throw new BadRequestException('참여할 수 없는 소모임입니다');
    }

    if (meeting.currentParticipants >= meeting.maxParticipants) {
      throw new BadRequestException('정원이 마감되었습니다');
    }

    // 이미 참여 중인지 확인
    const existingParticipant = await this.participantsRepository.findOne({
      where: { meetingId, userId, status: 'confirmed' },
    });

    if (existingParticipant) {
      throw new BadRequestException('이미 참여 중인 소모임입니다');
    }

    // 참여자 추가
    const participant = await this.participantsRepository.save({
      meetingId,
      userId,
      status: 'confirmed',
    });

    // 현재 참여자 수 증가
    await this.meetingsRepository.increment({ id: meetingId }, 'currentParticipants', 1);

    // 정원이 다 찼는지 확인
    const updatedMeeting = await this.findById(meetingId);
    if (updatedMeeting.currentParticipants >= updatedMeeting.maxParticipants) {
      await this.meetingsRepository.update({ id: meetingId }, { status: 'closed' });
    }

    return participant;
  }

  async leave(userId: number, meetingId: number): Promise<void> {
    const participant = await this.participantsRepository.findOne({
      where: { meetingId, userId, status: 'confirmed' },
    });

    if (!participant) {
      throw new NotFoundException('참여 정보를 찾을 수 없습니다');
    }

    await this.participantsRepository.update(
      { id: participant.id },
      { status: 'cancelled' },
    );

    await this.meetingsRepository.decrement({ id: meetingId }, 'currentParticipants', 1);

    // 상태를 다시 open으로 변경
    await this.meetingsRepository.update(
      { id: meetingId, status: 'closed' },
      { status: 'open' },
    );
  }

  async createReview(
    reviewerId: number,
    meetingId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<MeetingReview> {
    // 참여자인지 확인
    const participant = await this.participantsRepository.findOne({
      where: { meetingId, userId: reviewerId, status: 'confirmed' },
    });

    if (!participant) {
      throw new BadRequestException('모임 참여자만 평가할 수 있습니다');
    }

    // 평가 대상자가 참여자인지 확인
    const reviewedParticipant = await this.participantsRepository.findOne({
      where: { meetingId, userId: createReviewDto.reviewedUserId, status: 'confirmed' },
    });

    if (!reviewedParticipant) {
      throw new BadRequestException('평가 대상자가 모임 참여자가 아닙니다');
    }

    // 이미 평가했는지 확인
    const existingReview = await this.reviewsRepository.findOne({
      where: {
        meetingId,
        reviewerId,
        reviewedUserId: createReviewDto.reviewedUserId,
      },
    });

    if (existingReview) {
      throw new BadRequestException('이미 평가를 완료했습니다');
    }

    // 리뷰 저장
    const review = await this.reviewsRepository.save({
      meetingId,
      reviewerId,
      ...createReviewDto,
    });

    // 매너 점수 업데이트
    await this.ratingsService.updateRating(createReviewDto.reviewedUserId, createReviewDto.rating);

    // 참여자의 평가 완료 상태 업데이트
    await this.participantsRepository.update(
      { id: participant.id },
      { hasReviewed: true },
    );

    return review;
  }

  async getReviews(meetingId: number): Promise<MeetingReview[]> {
    return this.reviewsRepository.find({
      where: { meetingId },
      relations: ['reviewer', 'reviewer.profile', 'reviewedUser', 'reviewedUser.profile'],
    });
  }

  async getParticipants(meetingId: number): Promise<MeetingParticipant[]> {
    return this.participantsRepository.find({
      where: { meetingId, status: 'confirmed' },
      relations: ['user', 'user.profile'],
    });
  }
}

