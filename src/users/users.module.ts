import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  // service : 비즈니스 로직을 분리하기 위해 존재하는 파트
  // 비즈니스 로직이란 ?
  // : 실 사용자에게는 보이지 않지만 해당 내용을 수행하기 위해 주고받는 모든 과정
  // 비즈니스 로직을 컨트롤러에서 사용하지 않고 분리하는 이유는 ?
  // : 다른 곳에서도 같은 로직을 사용할 수 있기 때문에 분리 [재사용성]
  providers: [UsersService],
})
export class UsersModule {}
