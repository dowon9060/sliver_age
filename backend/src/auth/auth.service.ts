import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    // 기존 사용자 확인
    const existingUser = await this.usersService.findByPhone(registerDto.phone);
    if (existingUser) {
      throw new ConflictException('이미 등록된 전화번호입니다');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 사용자 생성
    const user = await this.usersService.create({
      phone: registerDto.phone,
      password: hashedPassword,
      nickname: registerDto.nickname,
      gender: registerDto.gender,
      ageGroup: registerDto.ageGroup,
    });

    // JWT 토큰 생성
    const token = await this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        phone: user.phone,
        profile: user.profile,
      },
      ...token,
    };
  }

  async login(loginDto: LoginDto) {
    // 사용자 찾기
    const user = await this.usersService.findByPhone(loginDto.phone);
    if (!user) {
      throw new UnauthorizedException('전화번호 또는 비밀번호가 올바르지 않습니다');
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('전화번호 또는 비밀번호가 올바르지 않습니다');
    }

    // JWT 토큰 생성
    const token = await this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        phone: user.phone,
        profile: user.profile,
      },
      ...token,
    };
  }

  async generateToken(userId: number) {
    const payload = { sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userId: number) {
    return this.usersService.findById(userId);
  }
}

