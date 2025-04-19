import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Team } from "@/types/Team";
import { getTeams } from "@/api/info/info.api";
import { useEffect, useState } from "react";
import { getFullTemName } from "@/utils/getFullTeamName";
import Loading from "@/components/common/Loading";
import { typography } from "@/style/typography";

interface TeamListProps {
  selectedTeamId: number;
  setSelectedTeamId: (id: number) => void;
}

const TeamList = ({ setSelectedTeamId, selectedTeamId }: TeamListProps) => {
  const {
    data: teamName,
    isLoading,
    isError,
  } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: getTeams,
    staleTime: Infinity,
    select: (teams: Team[]) => {
      const fullNameTeams = getFullTemName(teams);
      return fullNameTeams.sort((a, b) =>
        a.name.localeCompare(b.name, "ko-KR"),
      );
    },
  });
  const [sortedTeams, setSortedTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (teamName && sortedTeams.length === 0) {
      const sorted = [...teamName].sort((a, b) => {
        if (a.id === selectedTeamId) return -1;
        if (b.id === selectedTeamId) return 1;
        return 0;
      });
      setSortedTeams(sorted);
    }
  }, [teamName, setSortedTeams, selectedTeamId]);

  if (isLoading) return <Loading />;
  if (isError) throw new Error("서버문제로 인한 에러.");
  if (!teamName) return null;

  const myCheerCategory = { id: 0, name: "My 응원가" };
  // const cheersCat = [myCheerCategory, ...data];

  const handleTeamClick = (team: Team) => {
    setSelectedTeamId(team.id);
  };

  return (
    <TeamListContainer>
      <FixedTeamButton
        type='button'
        onClick={() => handleTeamClick(myCheerCategory)}
        $active={myCheerCategory.id === selectedTeamId}>
        {myCheerCategory.name}
      </FixedTeamButton>
      <TeamLists>
        {sortedTeams.map((team) => (
          <TeamButton
            type='button'
            key={team.id}
            onClick={() => handleTeamClick(team)}
            $active={team.id === selectedTeamId}>
            {team.name}
          </TeamButton>
        ))}
      </TeamLists>
    </TeamListContainer>
  );
};

const TeamListContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: white;
  gap: 20px;
`;

const FixedTeamButton = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 8px 16px;
  border: 1px solid gainsboro;
  background-color: ${(props) => (props.$active ? "#333" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  margin-left: 20px;
  width: 90px;
  height: 32px;
  ${typography.subtitle_01}
  font-weight: 500;
`;

const TeamLists = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TeamButton = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 8px 16px;
  border: 1px solid gainsboro;
  background-color: ${(props) => (props.$active ? "#333" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  min-width: 90px;
  height: 32px;
  ${typography.subtitle_01}
  font-weight: 500;

  &:last-child {
    margin-right: 0;
  }
`;

export default TeamList;
