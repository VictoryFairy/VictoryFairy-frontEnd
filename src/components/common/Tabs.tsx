import styled from "styled-components";
import { typography } from "../../style/typography";

export interface TabProps {
  labels: string[]; // 탭의 라벨들을 받는 prop
  activeTab?: number; // 활성화된 탭의 인덱스
  onTabClick?: (index: number) => void; // 탭 클릭 이벤트 핸들러
  direction?: "row" | "column"; // 탭 방향 설정
}

const Tabs = ({
  labels,
  activeTab = 0,
  onTabClick,
  direction = "row",
}: TabProps) => {
  return (
    <TabsContainer direction={direction}>
      {labels.map((label, index) => (
        <Tab
          key={index}
          isActive={index === activeTab}
          onClick={() => onTabClick?.(index)}>
          {label}
        </Tab>
      ))}
    </TabsContainer>
  );
};

const TabsContainer = styled.div<{ direction: "row" | "column" }>`
  display: flex;
  ${typography.display}
  gap: 16px;
  padding: 0 20px;
  flex-direction: ${({ direction }) => direction};
  height: 64px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  color: ${({ isActive }) =>
    isActive ? "var(--primary-color)" : "var(--gray-200)"};
  display: flex;
  align-items: center;
`;

export default Tabs;
