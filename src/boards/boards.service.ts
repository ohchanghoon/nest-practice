import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/boards.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

// 종속성을 주입하는 용도로써 다른 인젝터블데코레이터로 감싸서 모듈로 제공하며, 애플리케이션 전체에서 사용할 수 있다.
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async find(user: User): Promise<Board[]> {
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

  create(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
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
