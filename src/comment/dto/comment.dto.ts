import { IsNotEmpty, IsString } from 'class-validator';

export class createCmtDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
