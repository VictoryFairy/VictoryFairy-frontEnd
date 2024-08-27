import styled from "styled-components";
import { MyGame } from "@/types/Game";
import GameListItem from "../../common/GameListItem";

interface GameListItemProps {
  matches: MyGame[];
  onClick: (match: MyGame) => void;
  children: React.ReactNode;
}

const ListTab = ({ matches, onClick, children }: GameListItemProps) => {
  return (
    <ListContainer>
      {children}
      <GameList>
        {matches.map((match) => (
          <GameListItem onClick={onClick} key={match.id} match={match} />
        ))}
      </GameList>
    </ListContainer>
  );
};
const ListContainer = styled.div``;

const GameList = styled.ul`
  width: 100%;
`;

export default ListTab;
