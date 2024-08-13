import styled from "styled-components";
import { useState } from "react";
import FilterIcon from "../../assets/Icons/filter.svg?react";
import SearchIcon from "../../assets/Icons/search.svg?react";
import SelectionBar from "../common/SelectionBar";
import CalendarContainer from "../common/Calendar";
import { typography } from "../../style/typography";
import ListTab from "./ListTab";
import { MyGame } from "../../types/Game";

const DATA: MyGame[] = [
  {
    id: 1,
    image: "http://example.com/url/to/image.jpg",
    seat: "115블록 2열 13번",
    review: "좋았다",
    status: "WIN",
    game: {
      id: "20240801SSLG0",
      date: "2024-08-01",
      time: "18:30:00",
      status: "경기 종료",
      homeTeam: {
        id: 7,
        name: "LG",
      },
      awayTeam: {
        id: 4,
        name: "삼성",
      },
      stadium: {
        id: 1,
        name: "잠실",
        latitude: 0,
        longitude: 0,
        address: "no address",
      },
      homeTeamScore: 0,
      awayTeamScore: 7,
      winningTeam: {
        id: 4,
        name: "삼성",
      },
    },
    cheeringTeam: {
      id: 4,
      name: "삼성",
    },
  },
  {
    id: 2,
    image: "http://example.com/url/to/image2.jpg",
    seat: "116블록 3열 14번",
    review: "별로였다",
    status: "Lose",
    game: {
      id: "20240802SSLG0",
      date: "2024-08-02",
      time: "18:30:00",
      status: "경기 종료",
      homeTeam: {
        id: 7,
        name: "LG",
      },
      awayTeam: {
        id: 4,
        name: "삼성",
      },
      stadium: {
        id: 1,
        name: "잠실",
        latitude: 0,
        longitude: 0,
        address: "no address",
      },
      homeTeamScore: 5,
      awayTeamScore: 7,
      winningTeam: {
        id: 4,
        name: "삼성",
      },
    },
    cheeringTeam: {
      id: 7,
      name: "삼성",
    },
  },
  {
    id: 3,
    image: "http://example.com/url/to/image3.jpg",
    seat: "117블록 4열 15번",
    review: "괜찮았다",
    status: "Tie",
    game: {
      id: "20240803SSLG0",
      date: "2024-08-03",
      time: "18:30:00",
      status: "경기 종료",
      homeTeam: {
        id: 7,
        name: "LG",
      },
      awayTeam: {
        id: 4,
        name: "삼성",
      },
      stadium: {
        id: 1,
        name: "잠실",
        latitude: 0,
        longitude: 0,
        address: "no address",
      },
      homeTeamScore: 3,
      awayTeamScore: 3,
      winningTeam: {
        id: 0,
        name: "무승부",
      },
    },
    cheeringTeam: {
      id: 4,
      name: "삼성",
    },
  },
  {
    id: 4,
    image: "http://example.com/url/to/image4.jpg",
    seat: "118블록 5열 16번",
    review: "관중 없는 경기",
    status: "No game",
    game: {
      id: "20240804SSLG0",
      date: "2024-08-04",
      time: "18:30:00",
      status: "경기 취소",
      homeTeam: {
        id: 7,
        name: "LG",
      },
      awayTeam: {
        id: 4,
        name: "삼성",
      },
      stadium: {
        id: 1,
        name: "잠실",
        latitude: 0,
        longitude: 0,
        address: "no address",
      },
      homeTeamScore: 0,
      awayTeamScore: 0,
      winningTeam: {
        id: 0,
        name: "경기 없음",
      },
    },
    cheeringTeam: {
      id: 7,
      name: "삼성",
    },
  },
];

const WatchList = () => {
  const [activeSelect, setActiveSelect] = useState(0);
  const renderContent = () => {
    switch (activeSelect) {
      case 0:
        return <CalendarContainer data={DATA} />;
      case 1:
        return <ListTab data={DATA} />;
      case 2:
        return <div>갤러리</div>;
      default:
        return null;
    }
  };
  return (
    <WatchListContainer>
      <div className='watchList-header'>
        <h1>직관 리스트</h1>
        <div className='icons'>
          <FilterIcon />
          <SearchIcon />
        </div>
      </div>
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
  .watchList-header {
    display: flex;
    justify-content: space-between;
    h1 {
      ${typography.title_02}
    }
    .icons {
      display: flex;
      gap: 10px;
    }
  }
`;

export default WatchList;
