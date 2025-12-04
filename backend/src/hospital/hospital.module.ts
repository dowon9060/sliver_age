import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { Hospital } from './entities/hospital.entity';
import { HospitalReservation } from './entities/hospital-reservation.entity';
import { PickupRequest } from './entities/pickup-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hospital, HospitalReservation, PickupRequest]),
  ],
  providers: [HospitalService],
  controllers: [HospitalController],
  exports: [HospitalService],
})
export class HospitalModule {}

