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
import { Hospital } from './hospital.entity';

@Entity('pickup_requests')
export class PickupRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  hospitalId: number;

  @Column()
  pickupAddress: string; // 픽업 주소

  @Column({ type: 'timestamp' })
  requestedDateTime: Date;

  @Column({ type: 'text', nullable: true })
  notes: string; // 특이사항

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'assigned', 'picked_up', 'completed', 'cancelled'],
    default: 'pending'
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Hospital)
  @JoinColumn({ name: 'hospitalId' })
  hospital: Hospital;
}

