import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Board } from 'src/boards/board.entity';
import { Item } from 'src/item/item.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
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

  @Column({ nullable: false })
  nickname?: string;

  @Column({ nullable: true })
  @IsNumber()
  @Type(() => Number)
  age: number;

  @Column({ nullable: true })
  @IsNumber()
  birthday: string;

  @OneToMany((type) => Item, (item) => item.user, { eager: false })
  item: Item;
  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
