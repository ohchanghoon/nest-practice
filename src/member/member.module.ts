import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
// import { MemberRepository } from './repository/member.repository';

@Module({
  // imports: [TypeOrmModule.forFeature([MemberRepository])], // MemberRepository 등록
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
