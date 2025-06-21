import styled from "styled-components";
import { useState, useMemo } from "react";
import { GameResultType, MyGame } from "@/types/Game";
import { useNavigate } from "react-router-dom";
import { useRegisteredGame } from "@/hooks/useRegisteredGame";
import ListTab from "./ListTab/ListTab";
import SelectionBar from "../common/SelectionBar";
import GalleryTab from "./GalleryTab/GalleryTab";
import MonthNav from "../common/MonthNav";
import Text from "../common/Text";
import ActionIcons from "./_components/ActionIcons";
import SearchBar from "./_components/SearchBar";
import FilterMenu from "./_components/FilterMenu";
import CalendarTab from "./calendarTab/CalendarTab";

const WatchList = () => {
  const navigate = useNavigate();

  const [activeSelect, setActiveSelect] = useState(0);
  const [selectMonth, setSelectMonth] = useState(new Date());
  const [search, setSearch] = useState({
    state: false,
    value: "",
  });
  const [isFilter, setIsFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<GameResultType>("All");

  const { registeredGames, isSuccess } = useRegisteredGame(selectMonth);

  const handleMonthChange = (date: Date) => {
    setSelectMonth(date);
  };

  const handleClickMatch = (matchId: number) => {
    navigate(`/detail/${matchId}`);
  };

  const handleClickSearch = () =>
    setSearch({
      state: !search.state,
      value: "",
    });

  const handleClickFilter = () => {
    setIsFilter(!isFilter);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      value: e.target.value,
    });
  };

  const handleFilterSelect = (filterType: GameResultType) => {
    setSelectedFilter(filterType);
    setIsFilter(false);
  };

  const filteredRegisteredGames = useMemo(() => {
    let filtered = registeredGames;

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
  }, [registeredGames, search.value, selectedFilter]);

  const renderContent = () => {
    switch (activeSelect) {
      case 0 /* 달력 */:
        return (
          <CalendarTab
            onMonthChange={handleMonthChange}
            registeredGames={isSuccess ? filteredRegisteredGames! : []}
            selectedMonth={selectMonth}
          />
        );
      case 1 /* 리스트 */:
        return (
          <ListTab
            matches={isSuccess ? filteredRegisteredGames! : []}
            onClick={(matchId) => handleClickMatch(matchId)}>
            <MonthNav
              onMonthChange={handleMonthChange}
              selectMonth={selectMonth}
            />
          </ListTab>
        );
      case 2 /* 갤러리 */:
        return (
          <GalleryTab
            onClick={(match: MyGame) => handleClickMatch(match.id)}
            data={filteredRegisteredGames}>
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
        <Text variant='title_02'>내 직관</Text>
        <ActionIcons
          onClickSearch={handleClickSearch}
          onClickFilter={handleClickFilter}
        />
      </div>
      {search.state && (
        <SearchBar
          searchValue={search.value}
          onSearchChange={handleChangeSearch}
          onClearSearch={() => setSearch({ ...search, value: "" })}
        />
      )}
      {isFilter && <FilterMenu onSelectFilter={handleFilterSelect} />}
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
  }
`;

export default WatchList;
