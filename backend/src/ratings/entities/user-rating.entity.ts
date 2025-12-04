import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('user_ratings')
export class UserRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'int', default: 0 })
  positiveCount: number; // 긍정 평가 수

  @Column({ type: 'int', default: 0 })
  negativeCount: number; // 부정 평가 수

  @Column({ type: 'int', default: 0 })
  totalCount: number; // 총 평가 수

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 50.0 })
  score: number; // 최종 매너 점수 (0-100)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}

