import styled from "styled-components";
import { Game } from "@/types/Game";
import DoubleHeaderItem from "./DoubleHeaderItem";

interface DoubleHeaderProps {
  group: Game[];
  setSelectedDoubleHeader: React.Dispatch<React.SetStateAction<Game[]>>;
  selectedDoubleHeader: Game[];
  registeredGameIds: string[];
  allRegistered?: boolean;
}

const DoubleHeader = ({
  group,
  setSelectedDoubleHeader,
  selectedDoubleHeader,
  registeredGameIds,
  allRegistered = false,
}: DoubleHeaderProps) => {
  /**
   * 더블헤더 경기 선택 처리 함수
   * 등록된 경기는 선택할 수 없도록 제한
   */
  const handleSelectDoubleHeader = (match: Game) => {
    // 이미 등록된 경기는 선택 변경 불가
    const isGameRegistered = registeredGameIds.includes(match.id);
    if (isGameRegistered) {
      return;
    }

    const isSelected = selectedDoubleHeader.some((g) => g.id === match.id);
    if (isSelected) {
      setSelectedDoubleHeader(
        selectedDoubleHeader.filter((g) => g.id !== match.id),
      );
    } else if (selectedDoubleHeader.length < 2) {
      setSelectedDoubleHeader([...selectedDoubleHeader, match]);
    }
  };

  return (
    <DoubleHeaderContainer $allRegistered={allRegistered}>
      {group.map((match) => {
        const isGameRegistered = registeredGameIds.includes(match.id);
        const isChecked =
          isGameRegistered ||
          selectedDoubleHeader.some((g) => g.id === match.id);

        return (
          <DoubleHeaderItem
            key={match.id}
            match={match}
            onSelect={handleSelectDoubleHeader}
            checked={isChecked}
            disabled={isGameRegistered || allRegistered}
          />
        );
      })}
    </DoubleHeaderContainer>
  );
};
const DoubleHeaderContainer = styled.div<{
  $allRegistered: boolean;
}>`
  padding: 0px 20px;
  border-radius: 0px 0px 8px 8px;
  background-color: ${({ $allRegistered }) =>
    $allRegistered ? "var(--disabled-bg)" : "transparent"};
`;

export default DoubleHeader;
