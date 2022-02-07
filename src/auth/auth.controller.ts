import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { SearchBoardDto } from 'src/boards/dto/boards.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
// import { user } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private boardsService: BoardsService,
  ) {}

  // @Get()
  // find() {
  //   return this.authService.find();
  // }
  @Get('search')
  async search(@Query() query: SearchBoardDto): Promise<any> {
    return await this.boardsService.searchFilter(query, 'user');
  }

  @Post('/signup')
  signUp(
    // 요청이 컨트롤러에 있는 핸들러로 들어왔을 때 Dto에 있는 유효성 조건에 맞게
    // 체크를 해주려면 ValidationPipe가 필요
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }
}
