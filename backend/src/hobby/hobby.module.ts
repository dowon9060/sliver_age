import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HobbyService } from './hobby.service';
import { HobbyController } from './hobby.controller';
import { Hobby } from './entities/hobby.entity';
import { UserHobby } from './entities/user-hobby.entity';
import { EducationProgram } from './entities/education-program.entity';
import { ProgramApplication } from './entities/program-application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hobby,
      UserHobby,
      EducationProgram,
      ProgramApplication,
    ]),
  ],
  providers: [HobbyService],
  controllers: [HobbyController],
  exports: [HobbyService],
})
export class HobbyModule {}

