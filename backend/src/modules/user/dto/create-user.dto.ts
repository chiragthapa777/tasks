import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

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
