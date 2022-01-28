import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, MoreThan, Repository } from 'typeorm';
import { InsertItemDto, SearchTypeDto, UpdateItemDto } from './dto/item.dto';
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

  async findOne(id: number): Promise<Item> {
    try {
      return (await this.itemRepo.findOne(id)) ?? null;
    } catch (err) {
      throw err;
    }
  }

  async findPage(start: number, take: number): Promise<any> {
    try {
      const result = await this.itemRepo.find({
        skip: start - 1,
        take,
      });

      if (!result.length) return result;
      return this.searchList(result);
    } catch (err) {
      throw err;
    }
  }

  async search(
    start: number,
    take: number,
    query: SearchTypeDto,
  ): Promise<object> {
    const { condition } = query;

    if (condition === 'more') {
      return await this.moreThanProdutionDate(start, take, query);
    }
    return await this.lessThanProdutionDate(start, take, query);
  }

  async moreThanProdutionDate(
    start: number,
    take: number,
    query: SearchTypeDto,
  ): Promise<object> {
    const { name, productionDate } = query;

    try {
      const found = await this.itemRepo.find({
        where: {
          name: In([...name]),
          productionDate: MoreThan(productionDate),
        },
        skip: start - 1,
        take,
      });

      if (!found.length) return found;
      return this.searchList(found);
    } catch (err) {
      throw err;
    }
  }

  async lessThanProdutionDate(
    start: number,
    take: number,
    query: SearchTypeDto,
  ): Promise<object> {
    const { name, productionDate } = query;

    try {
      const found = await this.itemRepo.find({
        where: {
          name: In([...name]),
          productionDate: LessThan(productionDate),
        },
        skip: start - 1,
        take,
      });

      if (!found) return found;
      return this.searchList(found);
    } catch (err) {
      throw err;
    }
  }

  private searchList(found: Item[]): object | PromiseLike<object> {
    return {
      found,
      startId: found[0].id,
      getIds: found.length,
      lastId: found[found.length - 1].id,
    };
  }

  async create(insertItemDto: InsertItemDto): Promise<Item> {
    return await this.itemRepo.save(insertItemDto);
  }

  async delete(id: number): Promise<Item> {
    try {
      return await this.itemRepo.remove(await this.findOne(id));
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<void> {
    try {
      const findOne = await this.findOne(id);

      findOne.name = updateItemDto.name;
      findOne.productionDate = updateItemDto.productionDate;
      findOne.amount = updateItemDto.amount;

      await this.create(findOne);
    } catch (err) {
      throw err;
    }
  }
}
