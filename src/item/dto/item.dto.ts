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
  productionYear: number;

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
  productionYear: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
