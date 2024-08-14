export interface MyGame {
  id: number;
  image: string;
  seat: string;
  review: string;
  status: "WIN" | "Lose" | "Tie" | "No game";
  game: Game;
  cheeringTeam: {
    id: number;
    name: string;
  };
}

export interface Game {
  id: string;
  date: string;
  time: string;
  status: string;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
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
