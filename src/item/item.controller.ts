import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardsService } from 'src/boards/boards.service';
import { SearchBoardDto } from 'src/boards/dto/boards.dto';
import { QueryFailedError } from 'typeorm';
import { InsertItemDto, UpdateItemDto } from './dto/item.dto';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Controller('item')
@UseGuards(AuthGuard('jwt'))
// @UseGuards(AuthGuard())
export class ItemController {
  constructor(
    private itemService: ItemService,
    private boardsService: BoardsService,
  ) {}

  // @Get('find')
  // find() {
  //   return this.boardsService.searchFilter();
  // }
  @Get('find')
  find() {
    return this.itemService.find();
  }

  @Get('find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.itemService.findOne(id);
      if (result === null) {
        return new NotFoundException(`not found id: ${id}`);
      }
      return result;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new InternalServerErrorException('db error');
      } else {
        throw new InternalServerErrorException('server error');
      }
    }
  }

  // 조건 검색
  @Get('/search')
  async search(@Query() query: SearchBoardDto): Promise<object> {
    // return await this.itemService.search(query);
    return await this.boardsService.searchFilter(query);
  }

  @Get()
  async findPage(@Query() query: SearchBoardDto): Promise<object> {
    return await this.itemService.findPage(query);
  }

  @Post()
  async create(
    @Body(ValidationPipe) insertItemDto: InsertItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemService.create(insertItemDto, user);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    try {
      return await this.itemService.delete(id);
    } catch (err) {
      throw new NotFoundException(`not found id: ${id}`);
    }
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
    @GetUser() user: User,
  ): Promise<void> {
    try {
      return await this.itemService.update(id, updateItemDto, user);
    } catch (err) {
      throw new NotFoundException(`not found id: ${id}`);
    }
  }
}
