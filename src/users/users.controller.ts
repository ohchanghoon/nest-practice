import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  //   Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
// import { Response } from 'express';

// @Controller : 들어오는 요청 (get, post, patch, delete 등)을 처리하고 클라이언트에 응답을 반환 하는 역할
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') userId: number): User {
    return this.userService.findOne(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(
    @Body() registerUserInfo: CreateUserDto,
    // @Res() response: Response,
  ) {
    return this.userService.createOne(registerUserInfo);
    // response
    //   .status(HttpStatus.CREATED)
    //   .json(this.userService.createOne(registerUserInfo));
  }

  @Delete('/:id')
  deleteOne(@Param('id') userId: number) {
    return this.userService.deleteOne(userId);
  }

  @Patch('/:id')
  updateOne(
    @Param('id') userId: number,
    @Body() registerUserInfo: UpdateUserDto,
  ) {
    return this.userService.updateOne(userId, registerUserInfo);
  }
}
