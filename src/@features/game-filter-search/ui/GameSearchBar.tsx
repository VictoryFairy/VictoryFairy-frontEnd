import { useGameSearch } from "@/@features/game-filter-search";
import { SearchBar } from "@/@shared";

const GameSearchBar = () => {
  const { searchValue, handleSearch, handleClearSearch } = useGameSearch();

  return (
    <SearchBar
      value={searchValue}
      placeholder='경기장을 검색해주세요.'
      onChange={handleSearch}
      onClear={handleClearSearch}
    />
  );
};

export default GameSearchBar;
