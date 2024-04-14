import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsObject, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public descp: string;

  @IsNumber()
  @IsNotEmpty()
  public place: number;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

}