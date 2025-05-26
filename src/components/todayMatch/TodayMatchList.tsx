import styled from "styled-components";
import { sortMatchesByCheerTeamFirst } from "@/utils/sortMatchesByCheerTeamFirst";
import TodayMatchItem from "./TodayMatchItem";
import { useGame } from "../../hooks/useGame";
import Text from "../common/Text";

const DATE = new Date();

const TodayMatchList = () => {
  const { data } = useGame(DATE);
  const formatMatches = data && sortMatchesByCheerTeamFirst(data);
  return (
    <Container>
      <Text as='h1' variant='title_02'>
        오늘의 경기
      </Text>
      <TodayMatchListContainer>
        {formatMatches?.map((match) => (
          <TodayMatchItem key={match.id} match={match} />
        ))}
      </TodayMatchListContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 20px 0px;
`;

const TodayMatchListContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default TodayMatchList;
