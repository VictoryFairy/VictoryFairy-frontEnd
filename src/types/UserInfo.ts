interface User {
  id: number;
  email: string;
  nickname: string;
  image: string;
  primaryProvider: string;
  provider: string[];
}

interface Record {
  win: number;
  lose: number;
  tie: number;
  cancel: number;
  total: number;
  score: number;
}
export interface MypageUserInfo {
  user: User;
  record: Record;
}
