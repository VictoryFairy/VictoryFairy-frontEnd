import {
  GAMESTATUS_ALL,
  GAMESTATUS_CANCELED,
} from "@/@entities/todayMatch/config";

/** 경기 상태 타입 */
export type GameStatusType = (typeof GAMESTATUS_ALL)[number];
export type GameStatusCanceledType = (typeof GAMESTATUS_CANCELED)[number];

/** 팀 정보 */
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

/**
 * 서버에서 받는 경기 정보
 */
export interface GameDTO {
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

/**
 * 오늘의 경기 entity
 */
export interface Game {
  id: string;
  date: string;
  time: string;
  status: GameStatusType;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamScore: number;
  awayTeamScore: number;
}
