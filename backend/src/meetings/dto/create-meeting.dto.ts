import { IsString, IsNotEmpty, IsNumber, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMeetingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  locationId: number;

  @Type(() => Date)
  @IsDate()
  meetingDateTime: Date;

  @IsNumber()
  @Min(2)
  maxParticipants: number;

  @IsNumber()
  @Min(0)
  participationFee: number;
}

