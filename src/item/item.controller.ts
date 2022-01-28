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
  ValidationPipe,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { InsertItemDto, searchTypeDto, UpdateItemDto } from './dto/item.dto';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get('find')
  find() {
    return this.itemService.find();
  }

  @Get('find/:id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
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
  async search(@Query() searchTypeDto: searchTypeDto): Promise<object> {
    const result = await this.itemService.search(searchTypeDto);

    if (!result) {
      throw new NotFoundException(`not found list`);
    }
    return result;
  }

  @Get()
  async findPage(@Query() searchTypeDto: searchTypeDto): Promise<object> {
    const result = await this.itemService.findPage(searchTypeDto);

    if (!result) {
      throw new NotFoundException(`not found list`);
    }
    return result;
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
    @Param('id', ParseIntPipe) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<void> {
    try {
      return await this.itemService.update(id, updateItemDto);
    } catch (err) {
      throw new NotFoundException(`not found id: ${id}`);
    }
  }
}
