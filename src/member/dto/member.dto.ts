import { IsString } from 'class-validator';

export class RegisterDto {
  // @IsNumber()
  // memberId: number;

  @IsString()
  user_id: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  email: string;
}

export class LoginDto {
  @IsString()
  id: string;

  @IsString()
  password: string;
}
