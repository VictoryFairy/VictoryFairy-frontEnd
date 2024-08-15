import styled from "styled-components";
import GameListItem from "../../common/GameListItem";
import MonthNav from "../../common/MonthNav";

interface GameListItemProps {
  data?: any;
}

const ListTab = ({ data }: GameListItemProps) => {
  return (
    <ListContainer>
      <MonthNav />
      <GameList>
        {data.map((item: any) => (
          <GameListItem key={item.id} data={item} />
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
