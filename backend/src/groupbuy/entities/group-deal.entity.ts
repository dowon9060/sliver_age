import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('group_deals')
export class GroupDeal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountedPrice: number;

  @Column({ type: 'int' })
  minParticipants: number; // 최소 참여 인원

  @Column({ type: 'int', default: 0 })
  currentParticipants: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ 
    type: 'enum', 
    enum: ['active', 'completed', 'expired'],
    default: 'active'
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;
}

