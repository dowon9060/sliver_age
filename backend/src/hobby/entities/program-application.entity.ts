import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EducationProgram } from './education-program.entity';

@Entity('program_applications')
export class ProgramApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  programId: number;

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  })
  status: string;

  @CreateDateColumn()
  appliedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => EducationProgram)
  @JoinColumn({ name: 'programId' })
  program: EducationProgram;
}

