import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CommentService } from './comment.service';
import { createCmtDto } from './dto/comment.dto';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':id')
  cmt(
    @GetUser() user: User,
    @Param('id')
    id: number,
    @Body() cmt: createCmtDto,
  ): Promise<any> {
    return this.commentService.createCmt(user, id, cmt);
  }
}
