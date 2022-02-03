import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  //   @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  //   @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // 영문과 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only english and number',
  })
  password: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  birthday: string;
}
