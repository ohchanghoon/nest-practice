import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto, SearchBoardDto } from './dto/boards.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { Any, getRepository, In } from 'typeorm';

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

  async searchFilter(searchBoardDto: SearchBoardDto): Promise<object> {
    const { start, take } = searchBoardDto;
    delete searchBoardDto.start;
    delete searchBoardDto.take;
    const arr = Object.keys(searchBoardDto);
    const values = Object.values(searchBoardDto);
    const type: object = {};
    let query = '';

    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i].split('__')[0];
      const condition = arr[i].split('__')[1];
      const value = values[i].split(',');
      let operator = '';
      let extra = '';

      if (condition) {
        switch (condition) {
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

        if (value.length > 1) {
          switch (operator) {
            case '=':
              operator = 'IN';
              break;
            case '!=':
              operator = 'NOT IN';
              break;
          }
          i < arr.length - 1 ? (extra = 'AND ') : (extra = '');

          query += `user.${item} ${operator} (:...${item}) ${extra}`;
          type[item] = values[i].split(',');
          continue;
        }
        i < arr.length - 1 ? (extra = 'AND ') : (extra = '');

        query += `user.${item} ${operator} :${item} ${extra}`;
        type[item] = values[i];
      } else {
        i < arr.length - 1 ? (extra = 'AND ') : (extra = '');

        query += `${item} Like :${item} ${extra}`;
        type[item] = values[i];
      }
    }

    const result = await getRepository(Board)
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .skip(start ? start - 1 : 0)
      .limit(take ? take : 0)
      .where(`${query}`, {
        ...type,
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
