import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '../../users/entities/user.entity';

@Entity('post_reactions')
@Unique(['postId', 'userId'])
export class PostReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: ['like', 'dislike'] })
  type: string; // 좋아요 / 싫어요

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.reactions)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}

