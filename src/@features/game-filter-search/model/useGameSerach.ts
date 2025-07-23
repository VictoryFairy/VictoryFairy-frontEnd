import { useState } from "react";

export const useGameSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setIsSearch(true);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setIsSearch(false);
  };

  return {
    searchValue,
    isSearch,
    handleSearch,
    handleClearSearch,
  };
};
