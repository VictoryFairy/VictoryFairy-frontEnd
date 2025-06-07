import styled from "styled-components";
import { Game, GameResultType, Team } from "@/types/Game";
import { HTMLAttributes } from "react";
import Text from "./Text";
import ResultLabel from "./ResultLabel";
import Icon from "./Icon";

export interface GameListItemProps
  extends Omit<HTMLAttributes<HTMLUListElement>, "onClick"> {
  result: GameResultType;
  isWinningTeam: Team | null;
  homeTeam: Team;
  homeTeamScore: number;
  awayTeam: Team;
  awayTeamScore: number;
  date: string;
  stadium: Pick<Game, "stadium">["stadium"];
  status: Pick<Game, "status">["status"];
  onClick?: () => void;
}

const GameListItem = ({
  result,
  isWinningTeam,
  homeTeam,
  homeTeamScore,
  awayTeam,
  awayTeamScore,
  date,
  stadium,
  status,
  onClick,
}: GameListItemProps) => {
  // 경기 중 일때 ???
  // 응원팀 선택 전 일때 ???

  const isWinnigTeam = (teamId: number) => {
    if (!isWinningTeam) return false;
    if (isWinningTeam.id === teamId) {
      return true;
    }
    return false;
  };

  return (
    <GameListItemContainer
      className='match'
      onClick={() => {
        if (onClick) onClick();
      }}>
      <ResultLabel status={status} result={result} />
      <div className='game-info'>
        <div
          className={`team-score ${
            isWinnigTeam(homeTeam.id) ? "winning" : ""
          }`}>
          <Text variant='subtitle_02'>{homeTeam.name}</Text>
          <Text variant='subtitle_02'>{homeTeamScore}</Text>
          {isWinnigTeam(homeTeam.id) && (
            <Icon icon='IcPolygon' width={10} height={10} />
          )}
        </div>
        <div
          className={`team-score ${
            isWinnigTeam(awayTeam.id) ? "winning" : ""
          }`}>
          <Text variant='subtitle_02'>{awayTeam.name}</Text>
          <Text variant='subtitle_02'>{awayTeamScore}</Text>
          {isWinnigTeam(awayTeam.id) && (
            <Icon icon='IcPolygon' width={10} height={10} />
          )}
        </div>
      </div>
      <div className='vertical-line' />
      <div className='game-info-stadium'>
        <Text variant='caption'>{date}</Text>
        <Text variant='caption'>
          <Icon icon='IcLocation' width={15} height={15} />
          {stadium.name} 야구장
        </Text>
      </div>
    </GameListItemContainer>
  );
};
export const GameListItemContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 0px;
  gap: 8px;
  height: 84px;
  justify-content: center;
  border-bottom: 1px solid #efefef;

  .game-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px 8px;
    color: var(--gray-200);
    width: 100%;
  }

  .vertical-line {
    width: 1px;
    height: 100%;
    border: 0.1px solid #efefef;
    margin-left: 16px;
  }

  .team-score {
    display: flex;
    justify-content: space-between;
    min-width: 126px;
    position: relative;
  }
  .game-info-stadium {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    white-space: nowrap;
    gap: 8px;
    margin-left: -12px;
    color: var(--primary-color);
  }
  .winning {
    color: var(--primary-color);

    svg {
      position: absolute;
      top: 20%;
      right: -15px;
    }
  }
`;

export default GameListItem;
