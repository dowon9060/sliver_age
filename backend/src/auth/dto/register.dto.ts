import { IsString, IsNotEmpty, IsEnum, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  ageGroup: string; // '50대', '60대', '70대', '80대 이상'
}

