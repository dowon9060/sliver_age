import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostImage } from './entities/post-image.entity';
import { PostReaction } from './entities/post-reaction.entity';
import { Comment } from './entities/comment.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(PostImage)
    private postImagesRepository: Repository<PostImage>,
    @InjectRepository(PostReaction)
    private reactionsRepository: Repository<PostReaction>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createPost(authorId: number, createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create({
      authorId,
      content: createPostDto.content,
    });
    const savedPost = await this.postsRepository.save(post);

    // 이미지가 있으면 저장
    if (createPostDto.images && createPostDto.images.length > 0) {
      const images = createPostDto.images.map((url, index) => ({
        postId: savedPost.id,
        imageUrl: url,
        order: index,
      }));
      await this.postImagesRepository.save(images);
    }

    return this.findPostById(savedPost.id);
  }

  async findAllPosts(limit: number = 20, offset: number = 0): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['author', 'author.profile', 'images'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findPostById(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'author.profile', 'images', 'comments', 'comments.author', 'comments.author.profile'],
    });
  }

  async addReaction(userId: number, postId: number, type: 'like' | 'dislike'): Promise<void> {
    // 기존 반응 확인
    const existing = await this.reactionsRepository.findOne({
      where: { userId, postId },
    });

    if (existing) {
      if (existing.type === type) {
        // 같은 반응이면 삭제
        await this.reactionsRepository.delete({ id: existing.id });
        await this.updateReactionCounts(postId);
        return;
      } else {
        // 다른 반응이면 변경
        await this.reactionsRepository.update({ id: existing.id }, { type });
        await this.updateReactionCounts(postId);
        return;
      }
    }

    // 새 반응 추가
    await this.reactionsRepository.save({ userId, postId, type });
    await this.updateReactionCounts(postId);
  }

  private async updateReactionCounts(postId: number): Promise<void> {
    const likesCount = await this.reactionsRepository.count({
      where: { postId, type: 'like' },
    });
    const dislikesCount = await this.reactionsRepository.count({
      where: { postId, type: 'dislike' },
    });

    await this.postsRepository.update({ id: postId }, { likesCount, dislikesCount });
  }

  async createComment(authorId: number, postId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentsRepository.save({
      authorId,
      postId,
      content: createCommentDto.content,
    });

    // 댓글 수 증가
    await this.postsRepository.increment({ id: postId }, 'commentsCount', 1);

    return this.commentsRepository.findOne({
      where: { id: comment.id },
      relations: ['author', 'author.profile'],
    });
  }

  async deletePost(userId: number, postId: number): Promise<void> {
    await this.postsRepository.delete({ id: postId, authorId: userId });
  }

  async deleteComment(userId: number, commentId: number): Promise<void> {
    const comment = await this.commentsRepository.findOne({ where: { id: commentId } });
    if (comment) {
      await this.commentsRepository.delete({ id: commentId, authorId: userId });
      await this.postsRepository.decrement({ id: comment.postId }, 'commentsCount', 1);
    }
  }
}

