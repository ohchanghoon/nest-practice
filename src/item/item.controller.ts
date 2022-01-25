import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { InsertItemDto, UpdateItemDto } from './dto/item.dto';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get()
  find() {
    return this.itemService.find();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.itemService.findOne(id);
    } catch (err) {
      throw new NotFoundException(`not found id: ${id}`);
    }
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
