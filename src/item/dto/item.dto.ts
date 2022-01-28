import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Min,
} from 'class-validator';
import { type } from 'os';

export class InsertItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsNumber()
  productionDate: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class UpdateItemDto {
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsNumber()
  productionDate: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class PagenationDto {
  @IsNotEmpty()
  @IsNumber()
  start: number;

  @IsNotEmpty()
  @IsNumber()
  take: string;
}

export class SearchTypeDto {
  @Type(() => Number)
  @Min(1)
  @IsNumber()
  start: number;

  @Type(() => Number)
  @Min(1)
  @IsNumber()
  take: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  productionDate: number;

  @IsString()
  condition: string;
}
