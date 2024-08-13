import styled from "styled-components";
import { MyGame } from "../../types/Game";
import ResultLabel from "./ResultLabel";
import Text from "../common/Text";

interface GameListItemProps {
  data: MyGame;
}

// TODO: 파일명 좀 더 구체적으로 변경하기
// TODO: 아이콘 추가, 그 전에 아이콘 컴포넌트화
const GameListItem = ({ data }: GameListItemProps) => {
  return (
    <GameListItemContainer>
      <ResultLabel status={data.status}>{data.status}</ResultLabel>
      <div className='game-info'>
        <div
          className={`team-score ${data.game.homeTeam.name === data.game.winningTeam.name ? "highlight" : ""}`}>
          <Text variant='subtitle_02'>{data.game.homeTeam.name}</Text>
          <Text variant='subtitle_02'>{data.game.homeTeamScore}</Text>
        </div>
        <div
          className={`team-score ${data.game.awayTeam.name === data.game.winningTeam.name ? "highlight" : ""}`}>
          <Text variant='subtitle_02'>{data.game.awayTeam.name}</Text>
          <Text variant='subtitle_02'>{data.game.awayTeamScore}</Text>
        </div>
      </div>
      <div className='vertical-line' />
      <div className='game-info-stadium'>
        <Text variant='caption'>2024.05.24</Text>
        <Text variant='caption'>{data.game.stadium.name} 야구장</Text>
      </div>
    </GameListItemContainer>
  );
};
const GameListItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  gap: 8px;
  height: 84px;

  .game-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px 8px;
    color: var(--gray-200);

    .highlight {
      color: var(--black);
    }
  }

  .vertical-line {
    width: 1px;
    height: 100%;
    background-color: black;
    border: 1px solid #efefef;
  }

  .team-score {
    display: flex;
    justify-content: space-between;
    min-width: 126px;
  }
  .game-info-stadium {
    display: flex;
    flex-direction: column;
  }
`;

export default GameListItem;
