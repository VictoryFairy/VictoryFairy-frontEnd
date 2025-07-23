import styled from "styled-components";
import Icon from "@/components/common/Icon";

interface GameFilterSearchProps {
  onClickSearch: () => void;
  onClickFilter: () => void;
}

const GameFilterSearch = ({
  onClickSearch,
  onClickFilter,
}: GameFilterSearchProps) => {
  return (
    <GameFilterSearchContainer>
      <Icon icon='IcFilter' cursor='pointer' onClick={onClickFilter} />
      <Icon icon='IcSearch' cursor='pointer' onClick={onClickSearch} />
    </GameFilterSearchContainer>
  );
};
const GameFilterSearchContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default GameFilterSearch;
