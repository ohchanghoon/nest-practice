import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private cmtRepo: Repository<Comment>,
  ) {}

  async find(): Promise<object> {
    return await this.cmtRepo.find();
  }

  async createComment(user: User, comment: CreateCommentDto): Promise<object> {
    const username = user.username;
    return this.cmtRepo.save({ username, ...comment });
  }

  async updateComment(id: number, comment: CreateCommentDto): Promise<object> {
    return await this.cmtRepo.save({ id, ...comment });
  }
}
