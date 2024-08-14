import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/common/SearchBar";
import ArrowLeft from "../assets/Icons/arrow-left.svg?react";
import CheerSongList from "../components/info/cheerSong/CheerSongList";

const SearchCheerSong = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const handleSearchChange = (term: string) => {
    setSearch(term);
  };

  const handleSearch = () => {};
  return (
    <Container>
      <HeaderContainer>
        <ArrowLeft
          fill='var(--primary-color)'
          onClick={() => navigate(-1)}
          cursor='pointer'
        />
        <HeaderSection>
          <SearchBar
            placeholder='선수명, 제목, 가사를 검색해주세요'
            searchTerm={search}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
          />
        </HeaderSection>
      </HeaderContainer>
      <div className='list'>
        <CheerSongList teamName='롯데' />
        <CheerSongList teamName='삼성' />
        <CheerSongList teamName='한화' />
        <CheerSongList teamName='롯데' />
        <CheerSongList teamName='롯데' />
        <CheerSongList teamName='롯데' />
        <CheerSongList teamName='롯데' />
        <CheerSongList teamName='롯데' />
        <CheerSongList teamName='롯데' />
        <CheerSongList teamName='롯데' />
        <CheerSongList teamName='롯데' />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  min-height: 100vh;
  margin: auto;
  position: relative;
  padding-top: 60px;

  .list {
    margin-top: 20px;
  }
`;
const HeaderContainer = styled.div`
  height: 64px;
  position: fixed;
  top: 0;
  max-width: 480px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 30px 20px;
  background-color: var(--white);
  z-index: 10;
`;

const HeaderSection = styled.div`
  flex: 1;
  margin-left: 20px;
`;
export default SearchCheerSong;
