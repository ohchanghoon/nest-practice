import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/boards.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation-pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  // 접근제한자를 생성자파라미터(constructor)에 선언하면 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언된다.
  // private : 프로퍼티 자체를 BoardsController클래스 안에서만 사용하기 위해
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getAllBoards(user);
  }
  // @Get()
  // getAll(): Board[] {
  //   return this.boardService.getAll();
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }
  // @Get('/:id')
  // getPostById(@Param('id') id: string): Board {
  //   return this.boardService.getPostById(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createPost(@Body() createPostDto: CreatePostDto): Board {
  //   return this.boardService.createPost(createPostDto);
  // }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user);
  }
  // @Delete('/:id')
  // deletePost(@Param('id') id: string): void {
  //   this.boardService.deletePost(id);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
  // @Patch('/:id/status')
  // updatePostStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardService.updatePostStatus(id, status);
  // }
}
