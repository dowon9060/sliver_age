import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @UseGuards(JwtAuthGuard)
  @Post('posts')
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.communityService.createPost(req.user.userId, createPostDto);
  }

  @Get('posts')
  async findAllPosts(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.communityService.findAllPosts(
      limit ? parseInt(limit) : 20,
      offset ? parseInt(offset) : 0,
    );
  }

  @Get('posts/:id')
  async findPostById(@Param('id') id: string) {
    return this.communityService.findPostById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('posts/:id/reactions')
  async addReaction(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { type: 'like' | 'dislike' },
  ) {
    await this.communityService.addReaction(req.user.userId, +id, body.type);
    return { message: '반응이 추가되었습니다' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('posts/:id/comments')
  async createComment(
    @Request() req,
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.communityService.createComment(req.user.userId, +id, createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('posts/:id')
  async deletePost(@Request() req, @Param('id') id: string) {
    await this.communityService.deletePost(req.user.userId, +id);
    return { message: '게시글이 삭제되었습니다' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('comments/:id')
  async deleteComment(@Request() req, @Param('id') id: string) {
    await this.communityService.deleteComment(req.user.userId, +id);
    return { message: '댓글이 삭제되었습니다' };
  }
}

