import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';

interface CreateUserDto {
  phone: string;
  password: string;
  nickname: string;
  gender: string;
  ageGroup: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private profilesRepository: Repository<UserProfile>,
  ) {}

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  async findByPhone(phone: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { phone },
      relations: ['profile'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 사용자 생성
    const user = this.usersRepository.create({
      phone: createUserDto.phone,
      password: createUserDto.password,
    });
    const savedUser = await this.usersRepository.save(user);

    // 프로필 생성 (초기 매너 점수 50%)
    const profile = this.profilesRepository.create({
      userId: savedUser.id,
      nickname: createUserDto.nickname,
      gender: createUserDto.gender,
      ageGroup: createUserDto.ageGroup,
      mannerScore: 50.0,
    });
    await this.profilesRepository.save(profile);

    // 프로필을 포함한 사용자 정보 반환
    return this.findById(savedUser.id);
  }

  async updateProfile(userId: number, updateData: Partial<UserProfile>): Promise<UserProfile> {
    const profile = await this.profilesRepository.findOne({ where: { userId } });
    Object.assign(profile, updateData);
    return this.profilesRepository.save(profile);
  }

  async updateMannerScore(userId: number, newScore: number): Promise<void> {
    await this.profilesRepository.update(
      { userId },
      { mannerScore: newScore },
    );
  }
}

