// 데이터 유효성 체크

import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

// 더 안정적인 코드로 만들어줌, 타입스크립트의 타입으로도 사용된다.
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  nickName: string;

  age: number;

  birthday: number;
}

export class SearchBoardDto {
  @IsString()
  @IsOptional()
  username__equal: string;

  @IsString()
  @IsOptional()
  username__notequal: string;

  @IsString()
  @IsOptional()
  nickname__equal: string;

  @IsString()
  @IsOptional()
  nickname__notequal: string;

  @IsString()
  @IsOptional()
  birthday__gte: string;

  @IsString()
  @IsOptional()
  birthday__lte: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  age__gte?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  age__lte?: number;

  @Type(() => Number)
  @Min(1)
  @IsNumber()
  @IsOptional()
  start?: number;

  @Type(() => Number)
  @Min(1)
  @IsNumber()
  @IsOptional()
  take?: number;

  @IsOptional()
  name?: string | [];

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  productionDate__gte?: number;
}
