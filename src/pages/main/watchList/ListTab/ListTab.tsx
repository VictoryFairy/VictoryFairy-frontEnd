import styled from "styled-components";
import { MyGame } from "@/types/Game";
import { HTMLAttributes } from "react";
import GameListItem from "@/components/common/GameListItem";

interface GameListItemProps
  extends Omit<HTMLAttributes<HTMLUListElement>, "onClick"> {
  matches: MyGame[];
  children: React.ReactNode;
  onClick: (id: number) => void;
}

const ListTab = ({ matches, onClick, children }: GameListItemProps) => {
  return (
    <ListContainer>
      {children}
      <GameList>
        {matches.map((match) => (
          <GameListItem
            key={match.id}
            onClick={() => onClick(match.id)}
            result={match.status}
            isWinningTeam={match.game.winningTeam}
            homeTeam={match.game.homeTeam}
            homeTeamScore={match.game.homeTeamScore}
            awayTeam={match.game.awayTeam}
            awayTeamScore={match.game.awayTeamScore}
            date={match.game.date}
            time={match.game.time}
            stadium={match.game.stadium}
            status={match.game.status}
          />
        ))}
      </GameList>
    </ListContainer>
  );
};
const ListContainer = styled.div``;

const GameList = styled.ul`
  width: 100%;
  margin: 0;
`;

export default ListTab;
