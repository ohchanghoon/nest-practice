import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto, SearchBoardDto } from './dto/boards.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { getRepository } from 'typeorm';

// 종속성을 주입하는 용도로써 다른 인젝터블데코레이터로 감싸서 모듈로 제공하며, 애플리케이션 전체에서 사용할 수 있다.
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async find(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async userFind(user: User): Promise<Board[]> {
    // board 테이블에서 작업할 것
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  async findOne(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }

    return found;
  }

  async searchFilter(query: SearchBoardDto): Promise<object> {
    console.log(query);

    const arr = Object.keys(query);
    const values = Object.values(query);
    const searchType: object = {
      username: String,
      nickname: String,
      birthday: String,
      age: Number,
    };
    let searchQuery = '';

    for (let i = 0; i < arr.length; i += 1) {
      const searchItem = arr[i].split('__')[0];
      const searchCondition = arr[i].split('__')[1];
      let operator = '';
      let extra = '';

      switch (searchCondition) {
        case 'equal':
          operator = '=';
          break;
        case 'notequal':
          operator = '!=';
          break;
        case 'gte':
          operator = '>';
          break;
        case 'lte':
          operator = '<';
          break;
      }

      switch (i < arr.length - 1) {
        case true:
          extra = 'AND ';
          break;
        case false:
          extra = '';
          break;
      }

      searchQuery += `user.${searchItem} ${operator} :${searchItem} ${extra}`;
      searchType[searchItem] = values[i];
    }

    const result = await getRepository(Board)
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .where(`${searchQuery}`, {
        ...searchType,
      })
      .getMany();

    return result;
  }

  async create(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto, user);
  }

  async delete(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (!result.affected) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }
  }

  async updateStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.findOne(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
