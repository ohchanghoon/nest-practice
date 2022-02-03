import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  // 엔티티를 이용해서 데이터베이스 테이블을 생성 -> 엔티티파일이 어디에 있는지 설명
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // true값을 주면 애플리케이션 다시 실행 시 엔티티안에서
  // 수정된 컬럼의 길이 타입 변경값등을 해당 테이븡르 Drop한 후 다시생성
  // 프로덕션모드에서 true로 하면 데이터 날라가니까 false로 설정
  // synchronize: dbConfig.synchronize,
  synchronize: true,
};
