import styled from "styled-components";
import { TodayMatchItem, useTodayGames } from "@/@entities/todayMatch";
import { Text } from "@/@shared";

const DATE = new Date();

const TodayMatchList = () => {
  const { gameList, isNoMatches, hasMatches } = useTodayGames(DATE);

  return (
    <Container>
      <Text as='h1' variant='title_02'>
        오늘의 경기
      </Text>
      <TodayMatchListContainer>
        {isNoMatches && (
          <Text
            className='no-match-text'
            color='var(--gray-200)'
            variant='body_01'>
            오늘은 경기가 없는 날 입니다!
          </Text>
        )}
        {hasMatches &&
          gameList.map((match) => (
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
