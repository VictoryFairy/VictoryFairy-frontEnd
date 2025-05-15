import { GAMESTATUS_CANCELED, GAMESTATUS_ALL } from "@/constants";

export interface MyGame {
  id: number;
  image: string;
  seat: string;
  review: string;
  status: GameResultType;
  game: Game;
  cheeringTeam: Team;
}

export interface Game {
  id: string;
  date: string;
  time: string;
  status: GameStatusType;
  homeTeam: Team;
  awayTeam: Team;
  stadium: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
  };
  homeTeamScore: number;
  awayTeamScore: number;
  winningTeam: {
    id: number;
    name: string;
  };
}

export interface Team {
  id: number;
  name: string;
}

/** 클라이언트에서 사용하는 경기 상태 */
export type GameResultType = "All" | "Win" | "Lose" | "Tie" | "No game" | null;

// 취소 상태 타입
export type GameStatusCanceledType = (typeof GAMESTATUS_CANCELED)[number];

// 경기 상태 타입
export type GameStatusType = (typeof GAMESTATUS_ALL)[number];
