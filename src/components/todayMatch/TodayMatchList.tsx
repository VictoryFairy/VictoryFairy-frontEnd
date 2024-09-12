import styled from "styled-components";
import { setCheerTeamFirst } from "@/utils/setCheerTeamFirst";
import TodayMatchItem from "./TodayMatchItem";
import { useGame } from "../../hooks/useGame";
import Text from "../common/Text";

const DATE = new Date();

const TodayMatchList = () => {
  const { data } = useGame(DATE);
  const formatMatches = data && setCheerTeamFirst(data);
  return (
    <>
      <Text as='h1' variant='title_02'>
        오늘의 경기
      </Text>
      <TodayMatchListContainer>
        {formatMatches?.map((match) => (
          <TodayMatchItem key={match.id} match={match} />
        ))}
      </TodayMatchListContainer>
    </>
  );
};

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
