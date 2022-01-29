import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @Column({ nullable: true })
  // nickName: string;

  // @Column({ nullable: true })
  // age: number;

  // @Column({ nullable: true })
  // birthday: number;
}
