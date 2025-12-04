import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Meeting } from './meeting.entity';
import { User } from '../../users/entities/user.entity';

@Entity('meeting_reviews')
export class MeetingReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meetingId: number;

  @Column()
  reviewerId: number; // 평가하는 사람

  @Column()
  reviewedUserId: number; // 평가받는 사람

  @Column({ type: 'text', nullable: true })
  praise: string; // 칭찬 메시지

  @Column({ type: 'text', nullable: true })
  review: string; // 간단한 후기

  @Column({ type: 'enum', enum: ['positive', 'negative'] })
  rating: string; // 좋았어요 / 아쉬워요

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Meeting)
  @JoinColumn({ name: 'meetingId' })
  meeting: Meeting;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewerId' })
  reviewer: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewedUserId' })
  reviewedUser: User;
}

