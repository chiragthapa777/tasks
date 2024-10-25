import { Type } from '@nestjs/common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
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
  done?: boolean;

  @ApiProperty()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsNotEmpty()
  @IsDate()
  scheduledAt?: Date;

  @ApiHideProperty()
  user?: string | Types.ObjectId;
}
