import styled from "styled-components";
import TodayMatchItem from "./TodayMatchItem";
import { typography } from "../../style/typography";
import { useGame } from "../../hooks/useGame";

const DATE = new Date();

const TodayMatchList = () => {
  const { data } = useGame(DATE);
  return (
    <>
      <Title>오늘의 경기</Title>
      <TodayMatchListContainer>
        {data?.map((match) => <TodayMatchItem key={match.id} match={match} />)}
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
  overflow-x: scroll;
`;

export default TodayMatchList;
