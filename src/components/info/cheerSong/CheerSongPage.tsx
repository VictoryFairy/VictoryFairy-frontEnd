import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import TeamList from "./TeamList";
import search from "../../../assets/Icons/search.svg";
import { typography } from "../../../style/typography";
import SelectionBar from "../../common/SelectionBar";
import CheerSongList from "./CheerSongList";

const CheerSongPage = () => {
  const { teamId } = useAuthStore();
  const [selectedTeamId, setSelectedTeamId] = useState(teamId);
  const [activeTab, setActiveTab] = useState(0); // 0 team , 1 player
  const navigate = useNavigate();
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <Container>
      <SearchBarWrapper onClick={() => navigate("/search-cheerSong")}>
        <SearchInput placeholder='선수명, 제목, 가사를 입력해주세요' />
        <SearchIcon src={search} />
      </SearchBarWrapper>
      <TeamList
        selectedTeamId={selectedTeamId}
        setSelectedTeamId={setSelectedTeamId}
      />
      <div className='line' />
      <div className='selectContainer'>
        <SelectionBar
          labels={["팀 응원가", "선수 응원가"]}
          activeSelect={activeTab}
          onSelectClick={handleTabClick}
          direction='row'
        />
      </div>

      <CheerSongList teamName='롯데' />
      <CheerSongList teamName='삼성' />
      <CheerSongList teamName='한화' />
      <div>무한스크롤 트리거</div>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  max-width: 480px;
  width: calc(100% + 40px);
  margin: 0 -20px;
  display: flex;
  flex-direction: column;

  .line {
    width: 100%;
    height: 20px;
    background-color: var(--gray-50);
  }
  .selectContainer {
    margin: 20px 0;
    padding: 0 20px;
  }
`;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 0 20px;
  height: 35px;
  margin: 0 20px;
  margin-bottom: 20px;
  cursor: pointer;
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
export default CheerSongPage;
