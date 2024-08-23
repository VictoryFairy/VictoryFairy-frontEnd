import styled from "styled-components";
import { useState } from "react";
import { typography } from "@/style/typography";
import { MyGame } from "@/types/Game";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useRegisteredGame } from "@/hooks/useRegisteredGame";
import ListTab from "./ListTab/ListTab";
import FilterIcon from "@/assets/Icons/filter.svg?react";
import SearchIcon from "@/assets/Icons/search.svg?react";
import SelectionBar from "../common/SelectionBar";
import CalendarContainer from "../common/Calendar";
import GalleryTab from "./GalleryTab/GalleryTab";

const WatchList = () => {
  const [activeSelect, setActiveSelect] = useState(0);
  const [selectMonth, setselectMonth] = useState(new Date());
  const navigate = useNavigate();

  const { data, isSuccess } = useRegisteredGame(selectMonth);

  const handleMonthChange = (date: Date) => {
    setselectMonth(date);
  };

  const handleClickDay = (date: Date) => {
    // TODO: 이게 맞는 방법일까
    data?.forEach((item: MyGame) => {
      if (item.game.date === moment(date).format("YYYY-MM-DD")) {
        navigate(`/detail/${item.id}`);
      }
    });
  };

  const handleClickMatch = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const renderContent = () => {
    switch (activeSelect) {
      case 0:
        return (
          <CalendarContainer
            onClick={(date) => handleClickDay(date)}
            data={data}
            onMonthChange={handleMonthChange}
          />
        );
      case 1:
        return (
          <ListTab
            onMonthChange={handleMonthChange}
            matches={isSuccess ? (data ?? []) : []}
            onClick={(match: MyGame) => handleClickMatch(match.id)}
          />
        );
      case 2:
        return (
          <GalleryTab
            onClick={(match: MyGame) => handleClickMatch(match.id)}
            data={data}
          />
        );
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
    display: flex;
    justify-content: space-between;
    h1 {
      ${typography.title_02}
    }
    .icons {
      display: flex;
      gap: 10px;
    }
  }
`;

export default WatchList;
