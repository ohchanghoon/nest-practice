import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly job: string;
}
/*
- DTO 사용 이유 
    - 코드를 간결하게 하기 위해서 

    - but, 유효성 검사용도로는 사용 불가능 
    - main.ts에 유효성 검사용 pipe를 생성하면 가능 [pipe는 미들웨어와 비슷]
    - class-validator, class-transformer

    - generator 적용
*/
