import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hobby } from './entities/hobby.entity';
import { UserHobby } from './entities/user-hobby.entity';
import { EducationProgram } from './entities/education-program.entity';
import { ProgramApplication } from './entities/program-application.entity';

@Injectable()
export class HobbyService {
  constructor(
    @InjectRepository(Hobby)
    private hobbiesRepository: Repository<Hobby>,
    @InjectRepository(UserHobby)
    private userHobbiesRepository: Repository<UserHobby>,
    @InjectRepository(EducationProgram)
    private programsRepository: Repository<EducationProgram>,
    @InjectRepository(ProgramApplication)
    private applicationsRepository: Repository<ProgramApplication>,
  ) {}

  async findAllHobbies(): Promise<Hobby[]> {
    return this.hobbiesRepository.find();
  }

  async findAllPrograms(): Promise<EducationProgram[]> {
    return this.programsRepository.find({ where: { isActive: true } });
  }

  async applyToProgram(userId: number, programId: number): Promise<ProgramApplication> {
    return this.applicationsRepository.save({
      userId,
      programId,
      status: 'pending',
    });
  }

  async findHobbyMatches(userId: number): Promise<any[]> {
    // 사용자의 취미 찾기
    const userHobbies = await this.userHobbiesRepository.find({
      where: { userId },
      relations: ['hobby'],
    });

    if (userHobbies.length === 0) {
      return [];
    }

    const hobbyIds = userHobbies.map((uh) => uh.hobbyId);

    // 같은 취미를 가진 다른 사용자 찾기
    const matches = await this.userHobbiesRepository
      .createQueryBuilder('userHobby')
      .leftJoinAndSelect('userHobby.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('userHobby.hobby', 'hobby')
      .where('userHobby.hobbyId IN (:...hobbyIds)', { hobbyIds })
      .andWhere('userHobby.userId != :userId', { userId })
      .getMany();

    return matches;
  }
}

