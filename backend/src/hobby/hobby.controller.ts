import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('hobby')
export class HobbyController {
  constructor(private hobbyService: HobbyService) {}

  @Get('hobbies')
  async findAllHobbies() {
    return this.hobbyService.findAllHobbies();
  }

  @Get('programs')
  async findAllPrograms() {
    return this.hobbyService.findAllPrograms();
  }

  @UseGuards(JwtAuthGuard)
  @Post('programs/:id/apply')
  async applyToProgram(@Request() req, @Param('id') id: string) {
    return this.hobbyService.applyToProgram(req.user.userId, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('matches')
  async findHobbyMatches(@Request() req) {
    return this.hobbyService.findHobbyMatches(req.user.userId);
  }
}

