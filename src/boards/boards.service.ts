import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreatePostDto } from './dto/boards.dto';

// 종속성을 주입하는 용도로써 다른 인젝터블데코레이터로 감싸서 모듈로 제공하며, 애플리케이션 전체에서 사용할 수 있다.
@Injectable()
export class BoardsService {
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
