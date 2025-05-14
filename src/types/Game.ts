import { GameStatus } from "@/constants";

export interface MyGame {
  id: number;
  image: string;
  seat: string;
  review: string;
  status: GameStatus;
  game: Game;
  cheeringTeam: Team;
}

export interface Game {
  id: string;
  date: string;
  time: string;
  status: GameStatusServer;
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
export type GameStatusType = "All" | "Win" | "Lose" | "Tie" | "No game" | null;

/** 서버에서 사용하는 경기 상태 */
// TODO 뭔가 수정이 필요해보임
export type GameStatusServer = (typeof GameStatus)[number];
