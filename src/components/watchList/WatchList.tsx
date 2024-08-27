import styled from "styled-components";
import { useState, useMemo } from "react";
import { typography } from "@/style/typography";
import { MyGame } from "@/types/Game";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useRegisteredGame } from "@/hooks/useRegisteredGame";
import ListTab from "./ListTab/ListTab";
import SelectionBar from "../common/SelectionBar";
import CalendarContainer from "../common/Calendar";
import GalleryTab from "./GalleryTab/GalleryTab";
import MonthNav from "../common/MonthNav";
import Icon from "../common/Icon";
import Text from "../common/Text";

const WatchList = () => {
  const [activeSelect, setActiveSelect] = useState(0);
  const [selectMonth, setSelectMonth] = useState(new Date());
  const [search, setSearch] = useState({
    state: false,
    value: "",
  });
  const [filter, setFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Win" | "Lose" | "Tie" | "No game"
  >("All");

  const navigate = useNavigate();

  const { data, isSuccess } = useRegisteredGame(selectMonth);

  const handleMonthChange = (date: Date) => {
    setSelectMonth(date);
  };

  const handleClickDay = (date: Date) => {
    data?.forEach((item: MyGame) => {
      if (item.game.date === moment(date).format("YYYY-MM-DD")) {
        navigate(`/detail/${item.id}`);
      }
    });
  };

  const handleClickMatch = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const handleClickSearch = () => {
    setSearch({
      state: !search.state,
      value: "",
    });
  };

  const handleClickFilter = () => {
    setFilter(!filter);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      value: e.target.value,
    });
  };

  const handleFilterSelect = (
    filterType: "All" | "Win" | "Lose" | "Tie" | "No game",
  ) => {
    setSelectedFilter(filterType);
    setFilter(false); // Close the filter dropdown after selection
  };

  const filteredData = useMemo(() => {
    let filtered = data;

    if (search.value.trim()) {
      filtered = filtered?.filter((item: MyGame) =>
        item.game.stadium.name
          .toLowerCase()
          .includes(search.value.toLowerCase()),
      );
    }

    if (selectedFilter !== "All") {
      filtered = filtered?.filter(
        (item: MyGame) => item.status === selectedFilter,
      );
    }

    return filtered;
  }, [data, search.value, selectedFilter]);

  const renderContent = () => {
    switch (activeSelect) {
      case 0:
        return (
          <CalendarContainer
            onClick={(date) => handleClickDay(date)}
            data={filteredData}
            onMonthChange={handleMonthChange}
            selectMonth={selectMonth}
          />
        );
      case 1:
        return (
          <ListTab
            matches={isSuccess ? (filteredData ?? []) : []}
            onClick={(match: MyGame) => handleClickMatch(match.id)}>
            <MonthNav
              onMonthChange={handleMonthChange}
              selectMonth={selectMonth}
            />
          </ListTab>
        );
      case 2:
        return (
          <GalleryTab
            onClick={(match: MyGame) => handleClickMatch(match.id)}
            data={filteredData}>
            <MonthNav
              onMonthChange={handleMonthChange}
              selectMonth={selectMonth}
            />
          </GalleryTab>
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
          <Icon icon='IcFilter' cursor='pointer' onClick={handleClickFilter} />
          <Icon icon='IcSearch' cursor='pointer' onClick={handleClickSearch} />
        </div>
      </div>
      {search.state && (
        <div className='search'>
          {search.value ? (
            <Icon
              icon='IcCancel'
              cursor='pointer'
              onClick={() => setSearch({ ...search, value: "" })}
            />
          ) : (
            <Icon icon='IcSearch' cursor='pointer' fill='var(--gray-200)' />
          )}
          <input
            className='search-input'
            type='text'
            placeholder='경기장을 검색해주세요.'
            onChange={handleChangeSearch}
            value={search.value}
          />
        </div>
      )}
      {filter && (
        <FilterList>
          <FilterItem onClick={() => handleFilterSelect("All")}>
            <Text variant='subtitle_02'>전체</Text>
          </FilterItem>
          <FilterItem onClick={() => handleFilterSelect("Win")}>
            <Text variant='subtitle_02'>이긴 경기</Text>
          </FilterItem>
          <FilterItem onClick={() => handleFilterSelect("Lose")}>
            <Text variant='subtitle_02'>진 경기</Text>
          </FilterItem>
          <FilterItem onClick={() => handleFilterSelect("Tie")}>
            <Text variant='subtitle_02'>비긴 경기</Text>
          </FilterItem>
          <FilterItem onClick={() => handleFilterSelect("No game")}>
            <Text variant='subtitle_02'>경기 취소</Text>
          </FilterItem>
        </FilterList>
      )}
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
  position: relative;
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
  .search {
    position: relative;
    svg {
      position: absolute;
      z-index: 1;
      right: 10px;
      top: 6px;
      width: 20px;
      height: 20px;
    }
  }
  .search-input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    gap: 10px;
    background: var(--gray-50);
    border-radius: 8px;
    border: none;
    height: 36px;
    width: 100%;
  }
`;

const FilterList = styled.div`
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

export default WatchList;
