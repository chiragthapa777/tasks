import { Type } from '@nestjs/common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
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

  @ApiHideProperty()
  user?: string | Types.ObjectId;
}
