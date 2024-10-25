import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString().toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
