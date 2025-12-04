import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Location } from './entities/location.entity';
import { LocationCheckin } from './entities/location-checkin.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
    @InjectRepository(LocationCheckin)
    private checkinsRepository: Repository<LocationCheckin>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.locationsRepository.create(createLocationDto);
    return this.locationsRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  async findNearby(lat: number, lng: number, radius: number = 5): Promise<any[]> {
    // 간단한 거리 계산 (실제로는 더 정확한 공식 사용)
    const locations = await this.locationsRepository.find();
    
    const locationsWithDistance = await Promise.all(
      locations.map(async (location) => {
        const distance = this.calculateDistance(
          lat,
          lng,
          Number(location.latitude),
          Number(location.longitude),
        );

        if (distance <= radius) {
          const currentUsers = await this.getCurrentUsersCount(location.id);
          return {
            ...location,
            distance,
            currentUsers,
          };
        }
        return null;
      }),
    );

    return locationsWithDistance.filter((loc) => loc !== null);
  }

  async findById(id: number): Promise<Location> {
    return this.locationsRepository.findOne({ where: { id } });
  }

  async checkin(userId: number, locationId: number): Promise<LocationCheckin> {
    // 기존 체크인이 있는지 확인 (체크아웃 안 한 상태)
    const existingCheckin = await this.checkinsRepository.findOne({
      where: {
        userId,
        locationId,
        checkoutTime: IsNull(),
      },
    });

    if (existingCheckin) {
      return existingCheckin;
    }

    const checkin = this.checkinsRepository.create({
      userId,
      locationId,
    });
    return this.checkinsRepository.save(checkin);
  }

  async checkout(userId: number, locationId: number): Promise<void> {
    await this.checkinsRepository.update(
      {
        userId,
        locationId,
        checkoutTime: IsNull(),
      },
      {
        checkoutTime: new Date(),
      },
    );
  }

  async getCurrentUsers(locationId: number): Promise<any[]> {
    const checkins = await this.checkinsRepository.find({
      where: {
        locationId,
        checkoutTime: IsNull(),
      },
      relations: ['user', 'user.profile'],
    });

    return checkins.map((checkin) => ({
      gender: checkin.user.profile.gender,
      ageGroup: checkin.user.profile.ageGroup,
      checkinTime: checkin.checkinTime,
    }));
  }

  async getCurrentUsersCount(locationId: number): Promise<number> {
    return this.checkinsRepository.count({
      where: {
        locationId,
        checkoutTime: IsNull(),
      },
    });
  }

  // 두 좌표 간의 거리 계산 (km)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // 지구 반경 (km)
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

