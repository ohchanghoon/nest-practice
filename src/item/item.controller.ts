import {
  Body,
  Controller,
  DefaultValuePipe,
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
import { InsertItemDto, SearchTypeDto, UpdateItemDto } from './dto/item.dto';
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
  async search(
    @Query('start', new DefaultValuePipe(1), ParseIntPipe) start: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query() searchTypeDto: SearchTypeDto,
  ): Promise<object> {
    if (!start) {
      throw new NotFoundException(`can't not search start number is ${start}`);
    }
    return await this.itemService.search(start, take, searchTypeDto);
  }

  @Get()
  async findPage(
    @Query('start', new DefaultValuePipe(1), ParseIntPipe) start: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ): Promise<object> {
    if (!start) {
      throw new NotFoundException(`can't not search start number is ${start}`);
    }
    return await this.itemService.findPage(start, take);
  }

  @Post()
  async create(
    @Body(ValidationPipe) insertItemDto: InsertItemDto,
  ): Promise<Item> {
    return await this.itemService.create(insertItemDto);
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
  ): Promise<void> {
    try {
      return await this.itemService.update(id, updateItemDto);
    } catch (err) {
      throw new NotFoundException(`not found id: ${id}`);
    }
  }
}
