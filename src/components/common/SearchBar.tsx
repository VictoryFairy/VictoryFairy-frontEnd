import React, { useEffect, useState } from "react";
import styled from "styled-components";
import search from "@/assets/Icons/search.svg";
import { typography } from "@/style/typography";

interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  onSearch: () => void;
}

const SearchBar = ({
  placeholder,
  searchTerm,
  onSearchChange,
  onSearch,
  ...inputProps
}: SearchBarProps) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(debouncedSearchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchTerm, onSearchChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <SearchBarWrapper>
      <SearchInput
        placeholder={placeholder}
        value={debouncedSearchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        {...inputProps}
      />
      <SearchIcon src={search} onClick={onSearch} />
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  ${typography.title_01}
`;

const SearchIcon = styled.img`
  color: #888;
  cursor: pointer;
`;

export default SearchBar;
