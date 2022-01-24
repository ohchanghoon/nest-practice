import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.reposiory';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // 부모 컴포넌트 사용을 위한 키워드
    super({
      secretOrKey: 'Secret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
