import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.reposiory';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { BoardsModule } from 'src/boards/boards.module';
// import { BoardsModule } from 'src/boards/boards.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 36000,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => BoardsModule),
  ],
  controllers: [AuthController],
  // providers : 현재 auth모듈에서 사용하기 위해
  providers: [AuthService, JwtStrategy],
  // exports : 다른 모듈에서 사용하기 위해
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
