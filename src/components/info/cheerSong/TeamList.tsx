import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Team } from "@/types/Team";
import { getTeams } from "@/api/info/info.api";

interface TeamListProps {
  selectedTeamId: number;
  setSelectedTeamId: (id: number) => void;
}

const TeamList = ({ setSelectedTeamId, selectedTeamId }: TeamListProps) => {
  const { data, isLoading } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: getTeams,
    staleTime: Infinity,
  });

  if (!data) return;

  const cheersCat = [{ id: 0, name: "My 응원가" }, ...data];
  const handleTeamClick = (team: Team) => {
    setSelectedTeamId(team.id);
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <TeamListContainer>
      <TeamLists>
        {cheersCat?.map((team) => (
          <TeamButton
            type='button'
            key={team.id}
            onClick={() => handleTeamClick(team)}
            active={team.id === selectedTeamId}>
            {team.name}
          </TeamButton>
        ))}
      </TeamLists>
    </TeamListContainer>
  );
};

// 수평 스크롤을 지원하며 스크롤바를 숨기는 스타일
const TeamListContainer = styled.div`
  overflow: hidden; /* 기본 스크롤바 숨기기 */
  margin-bottom: 20px;
  background-color: white;
`;

const TeamLists = styled.div`
  display: flex; /* 자식 요소들을 수평으로 나열합니다. */

  overflow-x: auto; /* 수평 스크롤을 허용합니다. */
  overflow-y: hidden; /* 수직 스크롤은 숨깁니다. */
  -webkit-overflow-scrolling: touch; /* 부드러운 스크롤을 터치 스크롤에 적용합니다. */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari에서 스크롤바 숨기기 */
  }
`;

const TeamButton = styled.button<{ active: boolean }>`
  margin-right: 10px;
  padding: 8px 16px;
  border: 2px solid gainsboro;
  background-color: ${(props) => (props.active ? "#333" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;

  &:last-child {
    margin-right: 0;
  }
`;

export default TeamList;
