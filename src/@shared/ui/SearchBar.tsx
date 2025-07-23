import styled from "styled-components";
import Icon from "@/components/common/Icon";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
}

const SearchBar = ({
  value,
  placeholder = "검색어를 입력하세요",
  onChange,
  onClear,
  disabled = false,
  className,
}: SearchBarProps) => {
  const isSearch = value.length > 0;

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <SearchContainer className={className}>
      {isSearch ? (
        <Icon icon='IcCancel' cursor='pointer' onClick={handleClear} />
      ) : (
        <Icon icon='IcSearch' cursor='pointer' fill='var(--gray-200)' />
      )}
      <SearchInput
        type='text'
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        disabled={disabled}
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
