import Icon from "@/components/common/Icon";
import { typography } from "@/style/typography";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchBar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/search-cheerSong");
  };
  return (
    <SearchBarWrapper onClick={handleClick}>
      <SearchInput placeholder='선수명,제목,가사를 입력해주세요' />
      <Icon icon='IcSearch' cursor='pointer' />
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 0 10px;
  height: 35px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  ${typography.body_01}
`;
export default SearchBar;
