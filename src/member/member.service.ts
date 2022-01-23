import { Injectable } from '@nestjs/common';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  private member: Member[] = [];

  findAll() {
    return this.member;
  }

  findRegister(id) {
    return this.member.some((el) => {
      return el.id === id;
    });
  }

  signUp(registerInfo) {
    this.member.push({
      memberId: this.member.length + 1,
      ...registerInfo,
    });

    return this.member;
  }

  login(loginInfo) {
    const isUser = this.findRegister(loginInfo.id);
    console.log('isUser : ', isUser);

    // this.findOne(loginInfo)
    // this.member.filter((member) => this.member.id === );
  }
}
