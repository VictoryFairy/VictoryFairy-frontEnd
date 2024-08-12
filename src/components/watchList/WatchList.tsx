import styled from "styled-components";
import { useState } from "react";
import FilterIcon from "../../assets/Icons/filter.svg?react";
import SearchIcon from "../../assets/Icons/search.svg?react";
import SelectionBar from "../common/SelectionBar";
import CalendarContainer from "../common/Calendar";
import { typography } from "../../style/typography";

const DATA = [
  { date: new Date(2024, 7, 8), result: "win" }, // 8월 8일에 승리
  { date: new Date(2024, 7, 16), result: "lose" }, // 8월 16일에 패배
  { date: new Date(2024, 7, 27), result: "draw" }, // 8월 27일에 무승부
];

const WatchList = () => {
  const [activeSelect, setActiveSelect] = useState(0);
  const renderContent = () => {
    switch (activeSelect) {
      case 0:
        return <CalendarContainer data={DATA} />;
      case 1:
        return <div>리스트</div>;
      case 2:
        return <div>갤러리</div>;
      default:
        return null;
    }
  };
  return (
    <WatchListContainer>
      <div className='watchList-header'>
        <h1>직관 리스트</h1>
        <div className='icons'>
          <FilterIcon />
          <SearchIcon />
        </div>
      </div>
      <SelectionBar
        labels={["달력", "리스트", "갤러리"]}
        activeSelect={activeSelect}
        onSelectClick={setActiveSelect}
      />
      {renderContent()}
    </WatchListContainer>
  );
};
const WatchListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
  .watchList-header {
    ${typography.title_02}
    display: flex;
    justify-content: space-between;
    .icons {
      display: flex;
      gap: 10px;
    }
  }
`;

export default WatchList;
