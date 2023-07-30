import { Logger } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { type Room } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoomDto implements Partial<Room> {
  @ApiProperty({
    description: '방의 이미지\n\n첫 이미지가 대표 이미지가 됨.',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  // @IsString({ each: true })
  images: Express.Multer.File[];

  @ApiProperty({
    description: '판매 형식\n\n원룸, 아파트, 빌라 등등',
  })
  @IsString()
  roomTypeKey: string;

  @ApiProperty({
    description: '임대 형식\n\n월세, 전세 등등',
  })
  @IsString()
  priceTypeKey: string;

  @ApiProperty({
    description: '보증금',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  depositPrice?: number;

  @ApiProperty({
    description: '월세/전세비',
  })
  @Type(() => Number)
  @IsInt()
  rentPrice: number;

  @ApiProperty({
    description: '유지비',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  maintenancePrice?: number;

  @ApiProperty({
    description: '방 크기',
  })
  @Type(() => Number)
  @IsNumber()
  area: number;

  @ApiProperty({
    description: '주소',
  })
  address: string;

  @ApiProperty({
    description: '짧은 설명',
  })
  descriptionSimple: string;

  @ApiProperty({
    description: '방이 위치한 층',
  })
  @Type(() => Number)
  @IsInt()
  floorOfRoom: number;

  @ApiProperty({
    description: '전체 층 수',
  })
  @Type(() => Number)
  @IsInt()
  floorTotal: number;

  @ApiProperty({
    description: '방 개수',
  })
  @Type(() => Number)
  @IsInt()
  numOfRooms: number;

  @ApiProperty({
    description: '주차 가능 여부',
  })
  @Type(() => Boolean)
  @IsBoolean()
  parkAvailable: boolean;

  @ApiProperty({
    description: '긴 설명',
  })
  @IsString()
  descriptionDetailed: string;

  @ApiProperty({
    description:
      '방에 포함된 옵션\n\n각 옵션에 해당하는 키가 들어가며, 옵션 키는 /api/room/options에서 확인',
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    } else if (typeof value === 'string') {
      return value.split(',');
    } else {
      return [];
    }
  })
  options: string[] = [];
}
