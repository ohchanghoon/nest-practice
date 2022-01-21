import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory를 활용해 Nest 애플리케이션 생성
  // 즉, AppModule을 인자로 받아서 NestApp을 생성
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist : 데코레이터가 없는 입력값은 validator에 도달하지 못하게하는 것
      // 입력은 되지만 걸러서 들어오는 느낌
      whitelist: true,
      // forbidNonWhitelisted : 입력조차 안되게 막아버리는 느낌 -> 400 에러를 던진다
      forbidNonWhitelisted: true,
      // transform : 클라이언트가 보낸 값들을 우리가 정의한 타입으로 변환시켜줌
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

// url로 보낸 값은 무조건 string으로 입력되기 때문에 받아서 number로 변환을 해주어야하는
