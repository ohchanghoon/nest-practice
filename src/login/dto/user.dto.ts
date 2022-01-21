import { IsString } from 'class-validator';

export class SignUpUserdto {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  email: string;
}
