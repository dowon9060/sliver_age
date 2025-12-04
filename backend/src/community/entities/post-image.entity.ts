import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('post_images')
export class PostImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  order: number; // 이미지 순서

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.images)
  @JoinColumn({ name: 'postId' })
  post: Post;
}

