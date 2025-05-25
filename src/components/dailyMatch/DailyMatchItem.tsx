import styled from "styled-components";
import { motion } from "framer-motion";
import { GAMESTATUS_CANCELED } from "@/constants";
import { Game, GameStatusCanceledType, GameStatusType } from "@/types/Game";
import Radio from "../common/Radio";
import Text from "../common/Text";
import Icon from "../common/Icon";

interface DailyMatchItemProps {
  match: Game;
  $isSelected: boolean;
  onSelect: () => void;
}

const DailyMatchItem = ({
  match,
  $isSelected,
  onSelect,
}: DailyMatchItemProps) => {
  const isWinningTeam = (teamId: number) => {
    if (match.winningTeam === null) return false;
    return match.winningTeam.id === teamId;
  };

  const isCanceledGame = (status: GameStatusType) => {
    return GAMESTATUS_CANCELED.includes(status as GameStatusCanceledType);
  };

  return (
    <DailyMatchItemContainer
      $isSelected={$isSelected}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <Radio checked={$isSelected} onChange={onSelect} />
      <div className='game-info'>
        <div
          className={`team-score ${isWinningTeam(match.homeTeam.id) ? "winning" : ""}`}>
          <Text variant='subtitle_02'>{match.homeTeam.name}</Text>
          <Text variant='subtitle_02'>{match.homeTeamScore}</Text>
          {/* TODO: 리팩터링 필요 */}
          {isCanceledGame(match.status) ? (
            <Text variant='subtitle_02' className='canceled-bar'>
              -
            </Text>
          ) : (
            isWinningTeam(match.homeTeam.id) && (
              <Icon icon='IcPolygon' width={10} height={10} />
            )
          )}
        </div>
        <div
          className={`team-score ${isWinningTeam(match.awayTeam.id) ? "winning" : ""}`}>
          <Text variant='subtitle_02'>{match.awayTeam.name}</Text>
          <Text variant='subtitle_02'>{match.awayTeamScore}</Text>
          {isCanceledGame(match.status) ? (
            <Text variant='subtitle_02' className='canceled-bar'>
              -
            </Text>
          ) : (
            isWinningTeam(match.awayTeam.id) && (
              <Icon icon='IcPolygon' width={10} height={10} />
            )
          )}
        </div>
      </div>
      <div className='vertical-line' />
      <div className='game-info-stadium'>
        <Text variant='caption'>{match.date}</Text>
        <div>
          {isCanceledGame(match.status) ? (
            <Text variant='caption' className='canceled-text'>
              경기 취소
            </Text>
          ) : (
            <div>
              <Icon icon='IcLocation' width={15} height={15} />
              <Text variant='caption'> {match.stadium.name} 야구장</Text>
            </div>
          )}
        </div>
      </div>
    </DailyMatchItemContainer>
  );
};

const DailyMatchItemContainer = styled(motion.div)<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  height: 80px;

  border: ${({ $isSelected, theme }) =>
    $isSelected ? `1px solid ${theme.colors.primary}` : "1px solid #efefef"};
  .game-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px 8px;
    color: var(--gray-200);
    width: 100%;
  }

  .vertical-line {
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
  }
  .winning {
    color: var(--primary-color);

    svg {
      position: absolute;
      top: 20%;
      right: -15px;
    }
  }
  .canceled-bar {
    color: var(--primary-color);
  }
  .canceled-text {
    font-weight: 700;
  }
`;

export default DailyMatchItem;
