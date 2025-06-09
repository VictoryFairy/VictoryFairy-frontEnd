import styled from "styled-components";
import { motion } from "framer-motion";
import { Game, GameType } from "@/types/Game";
import Radio from "@/components/common/Radio";
import GameInfo from "./components/GameInfo";
import GameStadiumInfo from "./components/GameStadiumInfo";

interface DailyMatchItemProps {
  match: Game;
  $isSelected: boolean;
  onSelect: () => void;
  $isRegistered: boolean;
}

const DailyMatchItem = ({
  match,
  $isSelected,
  onSelect,
  $isRegistered,
}: DailyMatchItemProps) => {
  const isDoubleHeader =
    match.gameType === GameType.DOUBLEHEADER_1 ||
    match.gameType === GameType.DOUBLEHEADER_2;

  return (
    <DailyMatchItemContainer
      // $isRegistered={$isRegistered}
      $isRegistered
      $isSelected={$isSelected}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <Radio
        variant='circle'
        checked={$isSelected}
        onChange={onSelect}
        disabled={$isRegistered}
      />
      <GameInfo match={match} isDoubleHeader={isDoubleHeader} />
      <div className='vertical-line' />
      <GameStadiumInfo match={match} isDoubleHeader={isDoubleHeader} />
    </DailyMatchItemContainer>
  );
};

const DailyMatchItemContainer = styled(motion.div)<{
  $isSelected: boolean;
  $isRegistered: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  height: 80px;
  border: ${({ $isSelected, $isRegistered, theme }) =>
    $isRegistered
      ? "none"
      : $isSelected
        ? `1px solid ${theme.colors.primary}`
        : "1px solid var(--disabled-on)"};

  background-color: ${({ $isRegistered }) =>
    $isRegistered ? "var(--disabled-bg)" : "#fff"};

  .vertical-line {
    height: 100%;
    border: ${({ $isRegistered }) =>
      $isRegistered ? "0.1px solid var(--gray-100)" : "0.1px solid #efefef"};
    margin-left: 16px;
  }
`;

export default DailyMatchItem;
