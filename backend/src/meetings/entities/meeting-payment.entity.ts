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

@Entity('meeting_payments')
export class MeetingPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meetingId: number;

  @Column()
  userId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ unique: true })
  paymentKey: string; // 토스페이먼츠 결제 키

  @Column({ unique: true })
  orderId: string;

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Meeting)
  @JoinColumn({ name: 'meetingId' })
  meeting: Meeting;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}

