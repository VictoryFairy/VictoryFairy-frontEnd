import styled from "styled-components";
import { Game, GameStatusCanceledType, GameStatusType } from "@/types/Game";
import {
  GAMESTATUS_CANCELED,
  GAMESTATUS_CANCELED_DEFAULT,
  GAMESTATUS_PREPARING,
} from "@/constants";
import Text from "../common/Text";

interface TodayMatchItemProps {
  match: Game;
}

const TodayMatchItem = ({ match }: TodayMatchItemProps) => {
  const getStatus = (status: GameStatusType): GameStatusType => {
    if (GAMESTATUS_CANCELED.includes(status as GameStatusCanceledType)) {
      return GAMESTATUS_CANCELED_DEFAULT;
    }
    return status;
  };

  const isNoScoreStatus = (status: GameStatusType) => {
    return (
      status === GAMESTATUS_PREPARING ||
      GAMESTATUS_CANCELED.includes(status as GameStatusCanceledType)
    );
  };
  return (
    <TodayMatchItemContainer>
      <Text color='var(--gray-500)' className='status' variant='subtitle_01'>
        {getStatus(match.status)}
      </Text>
      <GameInfo>
        <div className='team'>
          <Text variant='subtitle_02'>{match.homeTeam.name}</Text>
          <Text variant='subtitle_02'>{match.awayTeam.name}</Text>
        </div>
        {isNoScoreStatus(match.status) ? null : (
          <div className='score'>
            <Text variant='subtitle_02'>{match.homeTeamScore}</Text>
            <Text variant='subtitle_02'>{match.awayTeamScore}</Text>
          </div>
        )}
      </GameInfo>
    </TodayMatchItemContainer>
  );
};
const TodayMatchItemContainer = styled.div`
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
    height: 52px;
    background: #efefef;
    border-radius: 4px;
  }
  .status {
    padding: 4px;
  }
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default TodayMatchItem;
