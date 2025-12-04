import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('meetings')
export class MeetingsController {
  constructor(private meetingsService: MeetingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.create(req.user.userId, createMeetingDto);
  }

  @Get()
  async findAll(@Query() filters: any) {
    return this.meetingsService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.meetingsService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  async join(@Request() req, @Param('id') id: string) {
    return this.meetingsService.join(req.user.userId, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/leave')
  async leave(@Request() req, @Param('id') id: string) {
    await this.meetingsService.leave(req.user.userId, +id);
    return { message: '모임 참여를 취소했습니다' };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/reviews')
  async createReview(
    @Request() req,
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.meetingsService.createReview(req.user.userId, +id, createReviewDto);
  }

  @Get(':id/reviews')
  async getReviews(@Param('id') id: string) {
    return this.meetingsService.getReviews(+id);
  }

  @Get(':id/participants')
  async getParticipants(@Param('id') id: string) {
    return this.meetingsService.getParticipants(+id);
  }
}

