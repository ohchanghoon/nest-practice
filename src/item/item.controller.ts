import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { InsertItemDto, UpdateItemDto } from './dto/item.dto';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  // @Get()
  // find() {
  //   return this.itemService.find();
  // }

  // 질문 : param으로 받으면 위치에 따라 원하지않은곳으로 들어가버림 해결방법은 ??
  @Get('/search/type')
  async search(@Query() query) {
    return await this.itemService.search(query);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      // return await this.itemService.findOne(id);
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

  @Get()
  async findPage(@Query() query) {
    const result = await this.itemService.findPage(query);

    if (result) {
      return result;
    }
    throw new NotFoundException(`not found id: ${query.start}`);
  }

  @Post()
  async create(
    @Body(ValidationPipe) insertItemDto: InsertItemDto,
  ): Promise<Item> {
    return await this.itemService.create(insertItemDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Item> {
    try {
      return await this.itemService.delete(id);
    } catch (err) {
      throw new NotFoundException(`not found id: ${id}`);
    }
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<void> {
    try {
      return await this.itemService.update(id, updateItemDto);
    } catch (err) {
      throw new NotFoundException(`not found id: ${id}`);
    }
  }
}
