import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  async find(): Promise<object> {
    return await this.commentService.find();
  }

  @Post()
  createComment(
    @GetUser() user: User,
    @Body() comment: CreateCommentDto,
  ): Promise<object> {
    return this.commentService.createComment(user, comment);
  }

  @Post('/:id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() comment: CreateCommentDto,
  ): Promise<object> {
    return this.commentService.updateComment(id, comment);
  }
}
