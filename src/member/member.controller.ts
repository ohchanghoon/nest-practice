import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/member.dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
    this.memberService.findAll();
  }

  //   @Get()
  //   findOne() {
  //     this.memberService.findOne();
  //   }

  @Post('/sign-up')
  signUp(@Body() registerInfo: RegisterDto) {
    return this.memberService.signUp(registerInfo);
  }

  @Post('/login')
  login(@Body() loginInfo: LoginDto) {
    return this.memberService.login(loginInfo);
  }
}
