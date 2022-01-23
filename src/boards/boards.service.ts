import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/boards.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

// 종속성을 주입하는 용도로써 다른 인젝터블데코레이터로 감싸서 모듈로 제공하며, 애플리케이션 전체에서 사용할 수 있다.
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }

    return found;
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  // getAll(): Board[] {
  //   return this.boards;
  // }
  // getPostById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find post with id: ${id}`);
  //   }
  //   return found;
  // }
  // createPost(createPostDto: CreatePostDto) {
  //   const { title, description } = createPostDto;
  //   console.log(title, description);
  //   const post: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(post);
  //   return post;
  // }
  // deletePost(id: string): void {
  //   // 유효성 검사 먼저
  //   const found = this.getPostById(id);
  //   this.boards = this.boards.filter((post) => post.id !== found.id);
  // }
  // updatePostStatus(id: string, status: BoardStatus): Board {
  //   const post = this.getPostById(id);
  //   post.status = status;
  //   return post;
  // }
}
