import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRating } from './entities/user-rating.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(UserRating)
    private ratingsRepository: Repository<UserRating>,
    private usersService: UsersService,
  ) {}

  async updateRating(userId: number, ratingType: 'positive' | 'negative'): Promise<void> {
    // 사용자 평가 레코드 가져오기 또는 생성
    let userRating = await this.ratingsRepository.findOne({ where: { userId } });

    if (!userRating) {
      userRating = this.ratingsRepository.create({
        userId,
        positiveCount: 0,
        negativeCount: 0,
        totalCount: 0,
        score: 50.0,
      });
    }

    // 평가 카운트 업데이트
    if (ratingType === 'positive') {
      userRating.positiveCount += 1;
    } else {
      userRating.negativeCount += 1;
    }
    userRating.totalCount += 1;

    // 매너 점수 계산 (긍정 비율 기반)
    const positiveRatio = userRating.positiveCount / userRating.totalCount;
    userRating.score = Math.round(positiveRatio * 100 * 100) / 100; // 소수점 둘째자리까지

    await this.ratingsRepository.save(userRating);

    // 사용자 프로필의 매너 점수도 업데이트
    await this.usersService.updateMannerScore(userId, userRating.score);
  }

  async getRating(userId: number): Promise<UserRating> {
    let rating = await this.ratingsRepository.findOne({ where: { userId } });
    
    if (!rating) {
      // 평가가 없으면 초기값 생성
      rating = this.ratingsRepository.create({
        userId,
        positiveCount: 0,
        negativeCount: 0,
        totalCount: 0,
        score: 50.0,
      });
      await this.ratingsRepository.save(rating);
    }

    return rating;
  }
}

