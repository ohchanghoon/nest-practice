// interface : 변수의 타입만 체크
// class : 변수의 타입체크 + 인스턴스 생성 가능
export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
