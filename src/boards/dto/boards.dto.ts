// 데이터 유효성 체크

import { IsNotEmpty } from 'class-validator';

// 더 안정적인 코드로 만들어줌, 타입스크립트의 타입으로도 사용된다.
export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
