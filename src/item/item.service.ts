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

  async findPage(searchTypeDto: SearchTypeDto): Promise<any> {
    const { start, take } = searchTypeDto;
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

  async search(query: SearchTypeDto): Promise<object> {
    return await this.searchByProductionDate(query);
  }

  async searchByProductionDate(query: SearchTypeDto): Promise<object> {
    const { start, take, productionDate, condition } = query;
    const findInfo: any = { where: {} };

    findInfo.where.name = In([...query.name.toString().split(',')]);
    condition === 'more'
      ? (findInfo.where.productionDate = MoreThan(productionDate))
      : (findInfo.where.productionDate = LessThan(productionDate));

    const found = await this.itemRepo.find({
      ...findInfo,
      skip: start - 1,
      take,
    });

    if (!found.length) return found;
    return this.searchList(found);
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
