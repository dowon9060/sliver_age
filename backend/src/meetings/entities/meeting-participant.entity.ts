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

@Entity('meeting_participants')
export class MeetingParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meetingId: number;

  @Column()
  userId: number;

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  })
  status: string;

  @Column({ default: false })
  hasReviewed: boolean; // 평가 완료 여부

  @CreateDateColumn()
  joinedAt: Date;

  @ManyToOne(() => Meeting, (meeting) => meeting.participants)
  @JoinColumn({ name: 'meetingId' })
  meeting: Meeting;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}

