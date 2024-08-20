import styled from "styled-components";
import { typography } from "@/style/typography";

export interface SelectionBarProps {
  labels: string[]; // 탭의 라벨들을 받는 prop
  activeSelect?: number; // 활성화된 탭의 인덱스
  onSelectClick?: (index: number) => void; // 탭 클릭 이벤트 핸들러
  direction?: "row" | "column"; // 탭 방향 설정
}

const SelectionBar = ({
  labels,
  activeSelect = 0,
  onSelectClick,
  direction = "row",
}: SelectionBarProps) => {
  return (
    <SelectionBarContainer direction={direction}>
      {labels.map((label, index) => (
        <Select
          key={index}
          isActive={index === activeSelect}
          onClick={() => onSelectClick?.(index)}>
          {label}
        </Select>
      ))}
    </SelectionBarContainer>
  );
};

const SelectionBarContainer = styled.div<{ direction: "row" | "column" }>`
  ${typography.title_02}
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ direction }) => direction};
  padding: 4px;
  background: var(--gray-50);
  border-radius: 8px;
  height: 48px;
`;

const Select = styled.span<{ isActive: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  gap: 10px;
  width: 100%;
  background: ${({ isActive }) =>
    isActive ? "var(--white)" : "var(--gray-50)"};
  border-radius: 4px;
  color: ${({ isActive }) =>
    isActive ? "var(--primary-color)" : "var(--gray-200)"};
`;

export default SelectionBar;
