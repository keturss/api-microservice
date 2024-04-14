import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public descp: string;

  @IsNumber()
  @IsNotEmpty()
  public pladeDispo: number;

  @IsNumber()
  @IsNumber()
  public price: number;
}