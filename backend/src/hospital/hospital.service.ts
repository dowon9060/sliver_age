import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';
import { HospitalReservation } from './entities/hospital-reservation.entity';
import { PickupRequest } from './entities/pickup-request.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalsRepository: Repository<Hospital>,
    @InjectRepository(HospitalReservation)
    private reservationsRepository: Repository<HospitalReservation>,
    @InjectRepository(PickupRequest)
    private pickupRequestsRepository: Repository<PickupRequest>,
  ) {}

  async findNearbyHospitals(lat: number, lng: number, radius: number = 5): Promise<Hospital[]> {
    const hospitals = await this.hospitalsRepository.find();
    
    // 거리 계산 후 필터링 (간단한 버전)
    return hospitals.filter((hospital) => {
      const distance = this.calculateDistance(
        lat,
        lng,
        Number(hospital.latitude),
        Number(hospital.longitude),
      );
      return distance <= radius;
    });
  }

  async createReservation(userId: number, reservationData: any): Promise<HospitalReservation> {
    return this.reservationsRepository.save({
      ...reservationData,
      userId,
      status: 'pending',
    });
  }

  async createPickupRequest(userId: number, pickupData: any): Promise<PickupRequest> {
    return this.pickupRequestsRepository.save({
      ...pickupData,
      userId,
      status: 'pending',
    });
  }

  async getReservations(userId: number): Promise<HospitalReservation[]> {
    return this.reservationsRepository.find({
      where: { userId },
      relations: ['hospital'],
      order: { reservationDateTime: 'DESC' },
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

