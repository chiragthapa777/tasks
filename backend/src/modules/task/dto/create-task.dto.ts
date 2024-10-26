import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  body?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @ApiProperty()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsNotEmpty()
  @IsDate()
  scheduledAt?: Date;

  @IsOptional()
  @ApiHideProperty()
  user?: string | Types.ObjectId;
}
