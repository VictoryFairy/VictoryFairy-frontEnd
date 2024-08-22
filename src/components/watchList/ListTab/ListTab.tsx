import styled from "styled-components";
import { MyGame } from "@/types/Game";
import GameListItem from "../../common/GameListItem";
import MonthNav from "../../common/MonthNav";

interface GameListItemProps {
  matches: MyGame[];
  onClick: (match: MyGame) => void;
  onMonthChange: (date: Date) => void;
}

const ListTab = ({ matches, onClick, onMonthChange }: GameListItemProps) => {
  return (
    <ListContainer>
      <MonthNav onMonthChange={onMonthChange} />
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
