import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  reviewedUserId: number;

  @IsString()
  @IsOptional()
  praise?: string;

  @IsString()
  @IsOptional()
  review?: string;

  @IsEnum(['positive', 'negative'])
  @IsNotEmpty()
  rating: string;
}

