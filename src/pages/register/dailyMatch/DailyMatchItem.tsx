import styled from "styled-components";
import { motion } from "framer-motion";
import { Game } from "@/types/Game";
import Radio from "@/components/common/Radio";
import GameInfo from "./components/GameInfo";
import GameStadiumInfo from "./components/GameStadiumInfo";
import DoubleHeader from "./DoubleHeader";

interface DailyMatchItemProps {
  match: Game;
  group: Game[];
  $isSelected: boolean;
  onSelect: () => void;
  $isRegistered: boolean;
  isDoubleHeader: boolean;
}

const DailyMatchItem = ({
  match,
  group,
  $isSelected,
  onSelect,
  $isRegistered,
  isDoubleHeader,
}: DailyMatchItemProps) => {
  return isDoubleHeader && $isSelected ? (
    <DoubleHeaderMatchItemContainer>
      <DoubleHeaderItemWrapper
        $isRegistered={$isRegistered}
        $isSelected={$isSelected}>
        <Radio
          variant='circle'
          checked={$isSelected}
          onChange={onSelect}
          disabled={$isRegistered}
        />
        <GameInfo match={match} isDoubleHeader={isDoubleHeader} />
        <div className='vertical-line' />
        <GameStadiumInfo match={match} isDoubleHeader={isDoubleHeader} />
      </DoubleHeaderItemWrapper>
      <DoubleHeader group={group} />
    </DoubleHeaderMatchItemContainer>
  ) : (
    <DailyMatchItemContainer
      $isRegistered={$isRegistered}
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

const DoubleHeaderMatchItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid var(--disabled-on);
`;

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

const DoubleHeaderItemWrapper = styled.div<{
  $isSelected: boolean;
  $isRegistered: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px 8px 0px 0px;
  height: 80px;
  border-bottom: 1px solid var(--gray-50);

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
