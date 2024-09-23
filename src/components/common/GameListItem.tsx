import styled from "styled-components";
import { MyGame } from "@/types/Game";
import Text from "./Text";
import ResultLabel from "./ResultLabel";
import Icon from "./Icon";

interface GameListItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, "onClick"> {
  match: MyGame;
  onClick?: (match: MyGame) => void;
}
// TODO : registerForm에서 재사용 할 수 있도록 리팩토링
// 문제는 내 직관 탭에서의 데이터와 registerForm에서의 데이터가 다르다는 것
// resultlabel을 데이터에 따라 다르게 렌더링 시켜야한다
const GameListItem = ({ match, onClick }: GameListItemProps) => {
  const isWinningTeam = (teamId: number) => {
    if (match.game.winningTeam === null) return false;
    return match.game.winningTeam.id === teamId;
  };

  const handleClick = () => {
    onClick?.(match);
  };

  return (
    <GameListItemContainer onClick={handleClick}>
      <ResultLabel status={match.status}>{match.status}</ResultLabel>
      <div className='game-info'>
        <div
          className={`team-score ${isWinningTeam(match.game.homeTeam.id) ? "winning" : ""}`}>
          <Text variant='subtitle_02'>{match.game.homeTeam.name}</Text>
          <Text variant='subtitle_02'>{match.game.homeTeamScore}</Text>
          {isWinningTeam(match.game.homeTeam.id) && (
            <Icon icon='IcPolygon' width={10} height={10} />
          )}
        </div>
        <div
          className={`team-score ${isWinningTeam(match.game.awayTeam.id) ? "winning" : ""}`}>
          <Text variant='subtitle_02'>{match.game.awayTeam.name}</Text>
          <Text variant='subtitle_02'>{match.game.awayTeamScore}</Text>
          {isWinningTeam(match.game.awayTeam.id) && (
            <Icon icon='IcPolygon' width={10} height={10} />
          )}
        </div>
      </div>
      <div className='vertical-line' />
      <div className='game-info-stadium'>
        <Text variant='caption'>{match.game.date}</Text>
        <Text variant='caption'>
          <Icon icon='IcLocation' width={15} height={15} />
          {match.game.stadium.name} 야구장
        </Text>
      </div>
    </GameListItemContainer>
  );
};
export const GameListItemContainer = styled.li`
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
