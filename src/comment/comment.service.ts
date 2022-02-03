import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { createCmtDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private cmtRepo: Repository<Comment>,
  ) {}

  async createCmt(user: User, id: number, cmt: createCmtDto): Promise<any> {
    console.log(user, id, cmt);

    return 'hello';
  }
}
