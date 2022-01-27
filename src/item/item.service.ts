import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertItemDto, PagenationDto, UpdateItemDto } from './dto/item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
  ) {}

  find(): Promise<Item[]> {
    return this.itemRepo.find();
  }

  async findOne(id: string): Promise<Item> {
    try {
      // findOne은 에러를 반환하지 않고, undefined를 반환해서 findOneOrFail을 사용
      return (await this.itemRepo.findOne(id)) ?? null;
    } catch (err) {
      throw err;
    }
  }

  async findPage(pagenationDto: any): Promise<object> {
    const { start, take } = pagenationDto;

    try {
      const found = await this.findOne(start);
      if (found) {
        const result = await this.itemRepo.find({
          skip: parseInt(start) - 1,
          take,
        });
        return {
          result,
          startId: parseInt(start),
          takeId: parseInt(take),
          lastId: result[result.length - 1].id,
        };
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async search(type: object): Promise<any> {
    const result = await this.itemRepo.find(type);
    return result;
  }

  async create(insertItemDto: InsertItemDto): Promise<Item> {
    return await this.itemRepo.save(insertItemDto);
  }

  async delete(id: string): Promise<Item> {
    try {
      return await this.itemRepo.remove(await this.findOne(id));
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<void> {
    try {
      const findOne = await this.findOne(id);

      findOne.name = updateItemDto.name;
      findOne.productionYear = updateItemDto.productionYear;
      findOne.amount = updateItemDto.amount;

      await this.create(findOne);
    } catch (err) {
      throw err;
    }
  }
}
