import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';

// 데코레이터는 클래스, 메서드 또는 속성에 대해 정의
// 데코레이터를 선언하면 해당 정의된 속성을 주입받아 사용 가능
@Module({
  // 앱 모듈은 앱컨트롤러와 앱서비스만 가지고 있는게 좋기 때문에
  // 이 자리에 있던 유저 컨트롤러와 서비스는 유저 모듈로 이동시킨다.
  // nest g mo users 명령어를 실행시키면 imports에 연결됨
  imports: [UsersModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
