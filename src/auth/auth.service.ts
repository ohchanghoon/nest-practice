import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.reposiory';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // service에서 repository에 접근하여 db에 관한연산을 진행 -> repository패턴으로 Typeorm을 이용한 하나의 패턴
    // 서비스에서 레포지터리를 사용하려면 서비스가 레포지터리를 가지고 있어야한다.
    // 서비스를 컨트롤러애서 생성자의 인자를 통해 inject한 것처럼, repository도 service의 생성자의 인자를 통해 inject할 수 있다.
    // === 싱글톤 패턴
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async find() {
    return this.userRepository.find();
  }

  // 비동기적이기때문에 반환값을 Promise로 받음
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    // findOne : TypeORM이 제공하는 메서드
    // 인자로 들어가는 값에서 가장 먼저 나타나는 튜플을 반환하며 비동기적으로 동작
    // async/await 사용해서 db에서 처리되는 시간동안 다른 작업을 수행하다가, 처리가 완료된 다음 문제를 해결
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (secret + payload)
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }
    throw new UnauthorizedException('login failed');
  }
}
