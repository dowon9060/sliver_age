import { Controller, Get, Param, UseGuards, Request, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    const user = await this.usersService.findById(+id);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      profile: user.profile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/rating')
  async getUserRating(@Param('id') id: string) {
    const user = await this.usersService.findById(+id);
    return {
      userId: user.id,
      mannerScore: user.profile.mannerScore,
      totalRatings: user.profile.totalRatings,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req, @Body() updateData: any) {
    return this.usersService.updateProfile(req.user.userId, updateData);
  }
}

