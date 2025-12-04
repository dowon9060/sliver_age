import { IsString, IsNotEmpty, IsNumber, IsEnum, IsBoolean, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsEnum(['senior_center', 'cafe', 'restaurant', 'other'])
  type: string;

  @IsBoolean()
  @IsOptional()
  isAffiliated?: boolean;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
}

