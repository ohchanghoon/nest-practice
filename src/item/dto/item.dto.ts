import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class searchTypeDto {
  @IsNotEmpty()
  start: number;

  @IsNotEmpty()
  take: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  productionDate: number;

  @IsString()
  condition: string;
}
