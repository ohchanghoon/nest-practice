import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// @Injectable : 클래스를 공급자로 표시하는 데코레이터 === 해당 class가 의존성으로 주입될수 있다고 정의
// : Nest의 내장 DI(Dependency Injection === 주입)시스템을 사용하여 생성자 매개변수 주입을 통해 공급자를 다른 클래스에 주입 가능
// 즉, 다른곳에서도 해당 service를 사요할 수 있게끔 설정해주는 것
@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    console.log(typeof id);

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('not registered user');
    }
    return user;
  }

  /**
   *
   * @param id
   */
  deleteOne(id: number) {
    this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
  }

  /**
   * @param id 아아디
   */
  delete(param: number | number[]) {
    if (Array.isArray(param)) {
      //배열 삭제 처리 delete from user where id in (ids)
    } else {
      //배열 삭제 처리 delete from user where id = id
    }
    //삭제처리
  }

  createOne(registerUserInfo: CreateUserDto) {
    this.users.push({
      id: this.users.length + 1,
      ...registerUserInfo,
    });
    return {
      id: this.users.length + 1,
      ...registerUserInfo,
    };
  }

  updateOne(id: number, userData: UpdateUserDto) {
    const userId = this.findOne(id);
    this.deleteOne(id);

    this.createOne({ ...userId, ...userData });
  }
}
