import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  productionDate: number;

  @Column({ nullable: true })
  amount: number;

  @ManyToOne((type) => User, (user) => user.item, { eager: false })
  user: User;

  // @ManyToMany((type) => Board, (board) => board.item, { eager: false })
  // boards: Board[];
  // @Column({ nullable: true })
  // nickName: string;

  // @Column({ nullable: true })
  // age: number;

  // @Column({ nullable: true })
  // birthday: number;
}
