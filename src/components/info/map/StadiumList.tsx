import styled from "styled-components";
import { useRef, useEffect } from "react";
import { Stadium } from "@/types/Stadium";
import { typography } from "@/style/typography";

interface StadiumListProps {
  selectedStadiumId: number;
  setSelectedStadiumId: (id: number) => void;
  stadiums: Stadium[];
  myteam: number;
}

const StadiumList = ({
  setSelectedStadiumId,
  selectedStadiumId,
  stadiums,
  myteam,
}: StadiumListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef<number>(0);

  const handleStadiumClick = (stadium: Stadium) => {
    setSelectedStadiumId(stadium.id);
    if (listRef.current) {
      scrollPosition.current = listRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = scrollPosition.current;
    }
  }, [selectedStadiumId]);

  const sortedStadiums = [...stadiums].sort((a, b) => {
    if (a.id === myteam) return -1;
    if (b.id === myteam) return 1;
    return a.fullName.localeCompare(b.fullName, "ko-KR");
  });

  return (
    <TeamListContainer>
      <TeamList ref={listRef}>
        {sortedStadiums.map((stadium) => (
          <TeamButton
            type='button'
            key={stadium.id}
            onClick={() => handleStadiumClick(stadium)}
            $active={stadium.id === selectedStadiumId}>
            {stadium.fullName}
          </TeamButton>
        ))}
      </TeamList>
    </TeamListContainer>
  );
};

// 수평 스크롤을 지원하며 스크롤바를 숨기는 스타일
const TeamListContainer = styled.div`
  overflow: hidden; /* 기본 스크롤바 숨기기 */
  margin-bottom: 10px;
`;

const TeamList = styled.div`
  display: flex; /* 자식 요소들을 수평으로 나열합니다. */
  overflow-x: auto; /* 수평 스크롤을 허용합니다. */
  overflow-y: hidden; /* 수직 스크롤은 숨깁니다. */
  -webkit-overflow-scrolling: touch; /* 부드러운 스크롤을 터치 스크롤에 적용합니다. */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  margin-bottom: 10px;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari에서 스크롤바 숨기기 */
  }
`;

const TeamButton = styled.button<{ $active: boolean }>`
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid gainsboro;
  background-color: ${(props) => (props.$active ? "#333" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  ${typography.subtitle_01}
  white-space: nowrap;
  height: 32px;
  font-weight: 500;

  &:last-child {
    margin-right: 0;
  }
`;

export default StadiumList;
