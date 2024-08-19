interface User {
  id: number;
  email: string;
  nickname: string;
  image: string;
}

export interface MypageUserInfo {
  user: User;
}
