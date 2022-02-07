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
  itemname: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  productionDate: number;

  @Column({ nullable: true })
  amount: number;

  @ManyToOne((type) => User, (user) => user.id, { eager: false })
  user: User;
}
