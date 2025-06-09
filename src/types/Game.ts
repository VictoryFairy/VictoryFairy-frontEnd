import { GAMESTATUS_CANCELED, GAMESTATUS_ALL } from "@/constants";

export interface MyGame {
  id: number;
  image: string;
  seat: string;
  review: string;
  status: GameResultType;
  gameType: GameType;
  game: Game;
  cheeringTeam: Team;
}

export interface Game {
  id: string;
  date: string;
  time: string;
  status: GameStatusType;
  gameType: GameType;
  homeTeam: Team;
  awayTeam: Team;
  stadium: {
    id: number;
    name: string;
    fullName: string;
    latitude: number;
    longitude: number;
    address: string;
  };
  homeTeamScore: number;
  awayTeamScore: number;
  winningTeam: Team | null;
}

export interface Team {
  id: number;
  name:
    | "삼성 라이온즈"
    | "두산 베어스"
    | "엘지 트윈스"
    | "한화 이글스"
    | "기아 타이거즈"
    | "SSG 랜더스"
    | "NC 다이노스"
    | "롯데 자이언츠"
    | "키움 히어로즈"
    | "KT 위즈";
}

/** 클라이언트에서 사용하는 경기 상태 */
export type GameResultType = "All" | "Win" | "Lose" | "Tie" | "No game" | null;

// 취소 상태 타입
export type GameStatusCanceledType = (typeof GAMESTATUS_CANCELED)[number];

// 경기 상태 타입
export type GameStatusType = (typeof GAMESTATUS_ALL)[number];

/**
 * 0: 일반경기
 * 1: 더블헤더 1
 * 2: 더블헤더 2
 */
export enum GameType {
  NORMAL = 0,
  DOUBLEHEADER_1 = 1,
  DOUBLEHEADER_2 = 2,
}
