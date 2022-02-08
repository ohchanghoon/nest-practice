import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  //
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  username: string;

  @Column({ nullable: true, default: 0 })
  depth: number;

  @ManyToOne((type) => Comment, (comment) => comment.board)
  board: Board;
}
