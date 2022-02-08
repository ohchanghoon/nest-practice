import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

// export class InsertItemDto {
//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @IsNotEmpty()
//   @IsString()
//   brand: string;

//   @IsNotEmpty()
//   @IsNumber()
//   productionDate: number;

//   @IsNotEmpty()
//   @IsNumber()
//   amount: number;
// }
export class InsertItemDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsNumber()
  productionDate: number;

  @IsString()
  @IsOptional()
  condition?: string;

  @IsString()
  @IsOptional()
  nickName?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsNumber()
  @IsOptional()
  birthday?: number;
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
  @IsOptional()
  start?: number;

  @Type(() => Number)
  @Min(1)
  @IsNumber()
  @IsOptional()
  take?: number;

  @IsOptional()
  itemname?: string | [];

  // @IsOptional()
  // name__equal?: string | [];

  // @IsOptional()
  // name__notequal?: string | [];

  @IsOptional()
  productionDate?: number;

  @IsString()
  @IsOptional()
  condition?: string;

  // @IsString()
  // @IsOptional()
  // nickName?: string;
  @IsString()
  @IsOptional()
  nickName__equal?: string;

  @IsString()
  @IsOptional()
  nickName__notequal?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsNumber()
  @IsOptional()
  birthday?: number;
}
