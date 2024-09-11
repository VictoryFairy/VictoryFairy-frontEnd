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
  status: string;
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

export type GameStatus = "All" | "Win" | "Lose" | "Tie" | "No game";
