import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { CreateBoardDto, SearchBoardDto } from './dto/boards.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation-pipe';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Boards');
  // 접근제한자를 생성자파라미터(constructor)에 선언하면 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언된다.
  // private : 프로퍼티 자체를 BoardsController클래스 안에서만 사용하기 위해
  constructor(private boardService: BoardsService) {}

  @Get()
  find(): Promise<Board[]> {
    return this.boardService.find();
  }

  @Get('user')
  userFind(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`${user.username} trying to get all boards`);
    return this.boardService.userFind(user);
  }

  @Get('/search')
  async searchFilter(@Query() query: SearchBoardDto): Promise<object> {
    return await this.boardService.searchFilter(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Board> {
    return this.boardService.findOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `${user.username} creating a new board. Payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardService.create(createBoardDto, user);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.delete(id, user);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateStatus(id, status);
  }
}
