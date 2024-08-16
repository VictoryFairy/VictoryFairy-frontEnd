import styled from "styled-components";
import { Game } from "../../types/Game";
import Radio from "../common/Radio";
import Text from "../common/Text";
import Icon from "../common/Icon";

interface DailyMatchItemProps {
  match: Game;
  isSelected: boolean;
  onSelect: () => void;
}

const DailyMatchItem = ({
  match,
  isSelected,
  onSelect,
}: DailyMatchItemProps) => {
  return (
    <DailyMatchItemContainer isSelected={isSelected}>
      <Radio checked={isSelected} onChange={onSelect} />
      <div className='game-info'>
        <div className='team-score'>
          <Text variant='subtitle_02'>{match.homeTeam.name}</Text>
          <Text variant='subtitle_02'>{match.homeTeamScore}</Text>
        </div>
        <div className='team-score'>
          <Text variant='subtitle_02'>{match.awayTeam.name}</Text>
          <Text variant='subtitle_02'>{match.awayTeamScore}</Text>
        </div>
      </div>
      <div className='vertical-line' />
      <div className='game-info-stadium'>
        <Text variant='caption'>2024.05.24</Text>
        <div>
          <Icon icon='IcLocation' width={15} height={15} />
          <Text variant='caption'> {match.stadium.name} 야구장</Text>
        </div>
      </div>
    </DailyMatchItemContainer>
  );
};

const DailyMatchItemContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  border: ${({ isSelected }) =>
    isSelected ? "1px solid var(--primary-color)" : "1px solid #efefef"};
  .game-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px 8px;
    color: var(--gray-200);
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
    align-items: center;
  }
`;

export default DailyMatchItem;
