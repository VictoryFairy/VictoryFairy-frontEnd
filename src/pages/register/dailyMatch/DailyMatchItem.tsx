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
  setSelectedDoubleHeader: React.Dispatch<React.SetStateAction<Game[]>>;
  selectedDoubleHeader: Game[];
  registeredGameIds: string[];
}

const DailyMatchItem = ({
  match,
  group,
  $isSelected,
  onSelect,
  $isRegistered,
  isDoubleHeader,
  setSelectedDoubleHeader,
  selectedDoubleHeader,
  registeredGameIds,
}: DailyMatchItemProps) => {
  /**
   * 더블헤더 경기의 모든 차전이 등록되었는지 확인
   */
  const isAllDoubleHeaderRegistered = () => {
    if (!isDoubleHeader || group.length !== 2) return false;
    return group.every((game) => registeredGameIds.includes(game.id));
  };

  /* 
   더블헤더 분기 처리
  */
  return isDoubleHeader && $isSelected ? (
    <DoubleHeaderMatchItemContainer
      $allRegistered={isAllDoubleHeaderRegistered()}>
      <DoubleHeaderItemWrapper
        $isRegistered={$isRegistered}
        $isSelected={$isSelected}
        $allRegistered={isAllDoubleHeaderRegistered()}>
        <Radio
          variant='circle'
          checked={$isSelected}
          onChange={onSelect}
          disabled={$isRegistered || isAllDoubleHeaderRegistered()}
        />
        <GameInfo match={match} isDoubleHeader={isDoubleHeader} />
        <div className='vertical-line' />
        <GameStadiumInfo match={match} isDoubleHeader={isDoubleHeader} />
      </DoubleHeaderItemWrapper>
      <DoubleHeader
        group={group}
        setSelectedDoubleHeader={setSelectedDoubleHeader}
        selectedDoubleHeader={selectedDoubleHeader}
        registeredGameIds={registeredGameIds}
        allRegistered={isAllDoubleHeaderRegistered()}
      />
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

const DoubleHeaderMatchItemContainer = styled.div<{
  $allRegistered: boolean;
}>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: ${({ $allRegistered, theme }) =>
    $allRegistered ? "none" : `1px solid ${theme.colors.primary}`};
  background-color: ${({ $allRegistered }) =>
    $allRegistered ? "var(--disabled-bg)" : "#fff"};
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
    margin-left: 16px;
  }
`;

const DoubleHeaderItemWrapper = styled.div<{
  $isSelected: boolean;
  $isRegistered: boolean;
  $allRegistered: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px 8px 0px 0px;
  height: 80px;
  border-bottom: 1px solid var(--gray-100);
  background-color: ${({ $isRegistered, $allRegistered }) =>
    $isRegistered || $allRegistered ? "var(--disabled-bg)" : "#fff"};

  .vertical-line {
    height: 100%;
    border: ${({ $isRegistered, $allRegistered }) =>
      $isRegistered || $allRegistered
        ? "0.1px solid var(--gray-100)"
        : "0.1px solid #efefef"};
    margin-left: 16px;
  }
`;

export default DailyMatchItem;
