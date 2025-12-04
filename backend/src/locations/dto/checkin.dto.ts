import { IsNumber, IsNotEmpty } from 'class-validator';

export class CheckinDto {
  @IsNumber()
  @IsNotEmpty()
  locationId: number;
}

