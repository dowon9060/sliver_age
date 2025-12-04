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

@Entity('hospital_reservations')
export class HospitalReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  hospitalId: number;

  @Column({ type: 'timestamp' })
  reservationDateTime: Date;

  @Column()
  department: string; // 진료과

  @Column({ type: 'text', nullable: true })
  symptoms: string; // 증상

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
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

