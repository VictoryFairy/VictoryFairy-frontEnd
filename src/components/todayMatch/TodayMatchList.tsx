import styled from "styled-components";
import { sortMatchesByCheerTeamFirst } from "@/utils/sortMatchesByCheerTeamFirst";
import { Game } from "@/types/Game";
import TodayMatchItem from "./TodayMatchItem";
import { useGame } from "../../hooks/useGame";
import Text from "../common/Text";

const DATE = new Date();

const TodayMatchList = () => {
  const { data } = useGame(DATE);

  return (
    <Container>
      <Text as='h1' variant='title_02'>
        오늘의 경기
      </Text>
      <TodayMatchListContainer>
        {data && data?.length !== 0 ? (
          sortMatchesByCheerTeamFirst(data as Game[])?.map((match) => (
            <TodayMatchItem key={match.id} match={match} />
          ))
        ) : (
          <Text
            className='no-match-text'
            color='var(--gray-200)'
            variant='body_01'>
            오늘은 경기가 없는 날 입니다!
          </Text>
        )}
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
  padding-top: 20px;
`;

const TodayMatchListContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: scroll;
  padding-bottom: 4px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default TodayMatchList;
