import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('hospital')
export class HospitalController {
  constructor(private hospitalService: HospitalService) {}

  @Get('nearby')
  async findNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radius') radius?: string,
  ) {
    return this.hospitalService.findNearbyHospitals(
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseFloat(radius) : 5,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('reserve')
  async createReservation(@Request() req, @Body() reservationData: any) {
    return this.hospitalService.createReservation(req.user.userId, reservationData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('pickup')
  async createPickupRequest(@Request() req, @Body() pickupData: any) {
    return this.hospitalService.createPickupRequest(req.user.userId, pickupData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('reservations')
  async getReservations(@Request() req) {
    return this.hospitalService.getReservations(req.user.userId);
  }
}

