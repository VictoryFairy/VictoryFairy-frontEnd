import styled from "styled-components";
import { Game } from "@/types/Game";
import Text from "../common/Text";

interface TodayMatchItemProps {
  match: Game;
}

const TodayMatchItem = ({ match }: TodayMatchItemProps) => {
  console.log(match);
  return (
    <TodayMatchItemContainer>
      <div className='team'>
        <Text variant='subtitle_02'>{match.homeTeam.name}</Text>
        <Text variant='subtitle_02'>{match.awayTeam.name}</Text>
      </div>
      {match.status === "경기전" ? (
        <Text variant='subtitle_02'>{match.status}</Text>
      ) : (
        <div className='score'>
          <Text variant='subtitle_02'>{match.homeTeamScore}</Text>
          <Text variant='subtitle_02'>{match.awayTeamScore}</Text>
        </div>
      )}
    </TodayMatchItemContainer>
  );
};
const TodayMatchItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  min-width: 160px;
  background: #ffffff;
  border: 1px solid var(--gray-100);
  border-radius: 8px;
  overflow: hidden;
  &:first-child {
    border-color: 1px solid var(--primary);
  }

  .team {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px;
    gap: 8px;
  }
  .score {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 8px;
    gap: 8px;
    width: 25px;
    height: 56px;
    background: #efefef;
    border-radius: 4px;
  }
`;

export default TodayMatchItem;
