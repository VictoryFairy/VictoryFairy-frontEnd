import styled from "styled-components";
import TodayMatchItem from "./TodayMatchItem";
import { typography } from "../../style/typography";

const DATA = [
  {
    id: 1,
    date: "2024-08-11T13:00:00Z",
    time: "13:00",
    status: "Completed",
    homeTeam: {
      id: 101,
      name: "두산 베어스",
    },
    awayTeam: {
      id: 102,
      name: "LG 트윈스",
    },
    stadium: {
      id: 201,
      name: "잠실야구장",
      latitude: 37.5121,
      longitude: 127.0726,
      address: "서울특별시 송파구 올림픽로 25",
    },
    homeTeamScore: "4",
    awayTeamScore: "6",
    winningTeam: {
      id: 102,
      name: "LG 트윈스",
    },
  },
  {
    id: 2,
    date: "2024-08-12T18:30:00Z",
    time: "18:30",
    status: "Completed",
    homeTeam: {
      id: 103,
      name: "삼성 라이온즈",
    },
    awayTeam: {
      id: 104,
      name: "KIA 타이거즈",
    },
    stadium: {
      id: 202,
      name: "대구 삼성 라이온즈 파크",
      latitude: 35.8078,
      longitude: 128.5661,
      address: "대구광역시 북구 대봉로 180",
    },
    homeTeamScore: "7",
    awayTeamScore: "2",
    winningTeam: {
      id: 103,
      name: "삼성 라이온즈",
    },
  },
  {
    id: 3,
    date: "2024-08-13T14:00:00Z",
    time: "14:00",
    status: "Scheduled",
    homeTeam: {
      id: 105,
      name: "한화 이글스",
    },
    awayTeam: {
      id: 106,
      name: "롯데 자이언츠",
    },
    stadium: {
      id: 203,
      name: "대전 한화생명이글스파크",
      latitude: 36.3171,
      longitude: 127.4289,
      address: "대전광역시 중구 대종로 373",
    },
    homeTeamScore: "0",
    awayTeamScore: "0",
    winningTeam: {
      id: 0,
      name: "",
    },
  },
  {
    id: 3,
    date: "2024-08-13T14:00:00Z",
    time: "14:00",
    status: "Scheduled",
    homeTeam: {
      id: 105,
      name: "한화 이글스",
    },
    awayTeam: {
      id: 106,
      name: "롯데 자이언츠",
    },
    stadium: {
      id: 203,
      name: "대전 한화생명이글스파크",
      latitude: 36.3171,
      longitude: 127.4289,
      address: "대전광역시 중구 대종로 373",
    },
    homeTeamScore: "0",
    awayTeamScore: "0",
    winningTeam: {
      id: 0,
      name: "",
    },
  },
];

const TodayMatchList = () => {
  return (
    <>
      <Title>오늘의 경기</Title>
      <TodayMatchListContainer>
        {DATA.map((match) => (
          <TodayMatchItem key={match.id} match={match} />
        ))}
      </TodayMatchListContainer>
    </>
  );
};

const Title = styled.h1`
  all: unset;
  ${typography.title_02}
`;

const TodayMatchListContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: scroll;
`;

export default TodayMatchList;
