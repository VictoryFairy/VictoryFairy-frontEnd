import styled from "styled-components";
import Icon from "@/components/common/Icon";

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

const SearchBar = ({
  searchValue,
  onSearchChange,
  onClearSearch,
}: SearchBarProps) => {
  return (
    <SearchContainer>
      {searchValue ? (
        <Icon icon='IcCancel' cursor='pointer' onClick={onClearSearch} />
      ) : (
        <Icon icon='IcSearch' cursor='pointer' fill='var(--gray-200)' />
      )}
      <SearchInput
        type='text'
        placeholder='경기장을 검색해주세요.'
        onChange={onSearchChange}
        value={searchValue}
      />
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 6px;
    width: 20px;
    height: 20px;
  }
`;

const SearchInput = styled.input`
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
`;
