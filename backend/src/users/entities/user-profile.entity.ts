import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  nickname: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  gender: string;

  @Column()
  ageGroup: string; // '50대', '60대', '70대', '80대 이상'

  @Column({ nullable: true })
  profileImage: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 50.0 })
  mannerScore: number; // 매너 점수 0-100

  @Column({ type: 'int', default: 0 })
  totalRatings: number; // 받은 평가 수

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: User;
}

