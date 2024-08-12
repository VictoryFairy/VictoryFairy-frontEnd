import React from "react";
import styled from "styled-components";
import search from "../../assets/Icons/search.svg";

interface SearchBarProps {
  placeholder: string;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  onSearch: () => void;
}

const SearchBar = ({
  placeholder,
  searchTerm,
  onSearchChange,
  onSearch,
}: SearchBarProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
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
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
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
  font-size: 14px;
`;

const SearchIcon = styled.img`
  color: #888;
  cursor: pointer;
`;

export default SearchBar;
