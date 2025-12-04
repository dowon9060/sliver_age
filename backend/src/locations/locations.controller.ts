import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  async findAll() {
    return this.locationsService.findAll();
  }

  @Get('nearby')
  async findNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radius') radius?: string,
  ) {
    return this.locationsService.findNearby(
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseFloat(radius) : 5,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.locationsService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/checkin')
  async checkin(@Param('id') id: string, @Request() req) {
    return this.locationsService.checkin(req.user.userId, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/checkout')
  async checkout(@Param('id') id: string, @Request() req) {
    await this.locationsService.checkout(req.user.userId, +id);
    return { message: '체크아웃이 완료되었습니다' };
  }

  @Get(':id/current-users')
  async getCurrentUsers(@Param('id') id: string) {
    return this.locationsService.getCurrentUsers(+id);
  }
}

