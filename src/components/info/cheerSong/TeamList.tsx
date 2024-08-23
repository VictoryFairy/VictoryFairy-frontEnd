import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Team } from "@/types/Team";
import { getTeams } from "@/api/info/info.api";
import { useEffect, useState } from "react";

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
  const [sortedTeams, setSortedTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (data && sortedTeams.length === 0) {
      const sorted = [...data].sort((a, b) => {
        if (a.id === selectedTeamId) return -1;
        if (b.id === selectedTeamId) return 1;
        return 0;
      });
      setSortedTeams(sorted);
    }
  }, [data, setSortedTeams, selectedTeamId]);

  if (isLoading) return <div>로딩중...</div>;
  if (!data) return null;

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
        active={myCheerCategory.id === selectedTeamId}>
        {myCheerCategory.name}
      </FixedTeamButton>
      <TeamLists>
        {sortedTeams.map((team) => (
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

const TeamListContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: white;
`;

const FixedTeamButton = styled.button<{ active: boolean }>`
  flex-shrink: 0;
  margin-right: 10px;
  padding: 8px 16px;
  border: 2px solid gainsboro;
  background-color: ${(props) => (props.active ? "#333" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
`;

const TeamLists = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TeamButton = styled.button<{ active: boolean }>`
  flex-shrink: 0;
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
