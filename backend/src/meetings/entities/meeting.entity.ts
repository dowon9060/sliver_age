import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Location } from '../../locations/entities/location.entity';
import { MeetingParticipant } from './meeting-participant.entity';

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hostId: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  locationId: number;

  @Column({ type: 'timestamp' })
  meetingDateTime: Date;

  @Column({ type: 'int' })
  maxParticipants: number;

  @Column({ type: 'int', default: 0 })
  currentParticipants: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  participationFee: number;

  @Column({ 
    type: 'enum', 
    enum: ['open', 'closed', 'completed', 'cancelled'],
    default: 'open'
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'hostId' })
  host: User;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @OneToMany(() => MeetingParticipant, (participant) => participant.meeting)
  participants: MeetingParticipant[];
}

