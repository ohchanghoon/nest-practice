import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, MoreThan, Repository } from 'typeorm';
import { InsertItemDto, searchTypeDto, UpdateItemDto } from './dto/item.dto';
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

  async findPage(pagenationDto: any): Promise<any> {
    const { start, take } = pagenationDto;

    try {
      const result = await this.itemRepo.find({
        skip: start - 1,
        take,
      });

      if (!result.length) {
        return null;
      }
      return this.searchList(result);
    } catch (err) {
      throw err;
    }
  }

  async search(query: searchTypeDto): Promise<object> {
    const { condition } = query;

    if (condition === 'more') {
      return await this.moreThanProdutionDate(query);
    }
    return await this.lessThanProdutionDate(query);
  }

  async moreThanProdutionDate(query: searchTypeDto): Promise<object> {
    const { start, take, name, productionDate } = query;

    try {
      const result = await this.itemRepo.find({
        where: {
          name: In([...name]),
          productionDate: MoreThan(productionDate),
        },
        skip: start - 1,
        take,
      });

      if (!result.length) {
        return null;
      }
      return this.searchList(result);
    } catch (err) {
      throw err;
    }
  }

  async lessThanProdutionDate(query: searchTypeDto): Promise<object> {
    const { start, take, name, productionDate } = query;

    try {
      const result = await this.itemRepo.find({
        where: {
          name: In([...name]),
          productionDate: LessThan(productionDate),
        },
        skip: start - 1,
        take,
      });

      if (!result) {
        return null;
      }
      return this.searchList(result);
    } catch (err) {
      throw err;
    }
  }

  private searchList(result: Item[]): object | PromiseLike<object> {
    return {
      result,
      startId: result[0].id,
      getIds: result.length,
      lastId: result[result.length - 1].id,
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
