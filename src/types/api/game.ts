import { Game } from "@/types/Game";

export interface GameMap {
  [matchupCode: string]: Game[];
}

export interface GetDailyMatchResponse {
  games: GameMap;
  registeredGameIds: string[];
}
