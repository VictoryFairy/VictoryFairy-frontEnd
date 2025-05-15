import styled from "styled-components";
import { GameResultType } from "@/types/Game";
import Text from "../common/Text";

const FILTERS = [
  { label: "전체", value: "All" },
  { label: "이긴 경기", value: "Win" },
  { label: "진 경기", value: "Lose" },
  { label: "비긴 경기", value: "Tie" },
  { label: "경기 취소", value: "No game" },
];

interface FilterMenuProps {
  onSelectFilter: (filter: GameResultType) => void;
}

const FilterMenu = ({ onSelectFilter }: FilterMenuProps) => {
  return (
    <FilterMenuContainer>
      {FILTERS.map((filter) => (
        <FilterItem
          key={filter.value}
          onClick={() => onSelectFilter(filter.value as GameResultType)}>
          <Text variant='subtitle_02'>{filter.label}</Text>
        </FilterItem>
      ))}
    </FilterMenuContainer>
  );
};
const FilterMenuContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 8px;
  z-index: 10;
  position: absolute;
  width: 120px;
  right: 0;
  top: 24px;
  background: #ffffff;
  border: 1px solid #efefef;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;
const FilterItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 10px;
  width: 96px;
  height: 34px;
  border-bottom: 1px solid var(--gray-50);
  cursor: pointer;
`;

export default FilterMenu;
