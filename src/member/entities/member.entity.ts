// export class Member {
//   id: string;
//   password: string;
//   name: string;
//   email: string;
// }

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'member' })
@Unique(['user_id'])
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, comment: '멤버 아이디' })
  user_id: string;

  @Column({ type: 'varchar', length: 30, comment: '멤버 비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 255, comment: 'salt' })
  salt: string;

  @Column({ type: 'varchar', length: 30, comment: '멤버 이름' })
  name: string;

  @Column({ type: 'varchar', length: 30, comment: '멤버 이메일' })
  email: string;
}
