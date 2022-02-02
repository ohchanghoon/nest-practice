import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  @IsNumber()
  @Type(() => Number)
  age: number;

  @Column({ nullable: true })
  @IsNumber()
  birthday: string;

  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
