import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsObject } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  public user: string;

  @IsString()
  @IsNotEmpty()
  public event: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public event: string;
}