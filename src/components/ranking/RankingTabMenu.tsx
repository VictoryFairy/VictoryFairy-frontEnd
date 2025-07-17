import styled from "styled-components";
import Text from "../common/Text";
import Button from "../common/Button";
import { teams } from "@/utils/getTeamInfo";
import { useMemo, useState } from "react";
import { useUserStore } from "@/store/userInfo";

interface RankingTabMenuProps {
  setTeamId: (id: number) => void;
  teamTab: string;
  setTeamTab: (name: string) => void;
}

const RankingTabMenu = ({
  setTeamId,
  teamTab,
  setTeamTab,
}: RankingTabMenuProps) => {
  const supportTeam = useUserStore((state) => state.supportTeam);

  const sortedTeams = useMemo(() => {
    return [
      ...teams.filter((team) => team.name === "전체"),
      ...teams.filter((team) => team.name.replace(/\s/g, "") === supportTeam),
      ...teams
        .filter(
          (team) =>
            team.name !== "전체" &&
            team.name.replace(/\s/g, "") !== supportTeam,
        )
        .sort((a, b) => a.name.localeCompare(b.name, "ko-KR")),
    ];
  }, [teams, supportTeam]);

  const handleClickTeam = (value: number) => {
    const selectedTeam = teams.find((team) => team.id === value);
    if (selectedTeam) {
      setTeamTab(selectedTeam.name);
      setTeamId(selectedTeam.id);
    }
  };
  return (
    <Container>
      {sortedTeams.map((element, index) => {
        return (
          <Button
            style={{
              color:
                teamTab === element.name ? "var(--white)" : "var(--gray-400)",
              border:
                teamTab === element.name ? "none" : "1px solid var(--gray-100)",
            }}
            styletype={teamTab === element.name ? "default" : "outline"}
            key={index}
            onClick={() => {
              handleClickTeam(element.id);
            }}>
            <Text variant='subtitle_01'>{element.name}</Text>
          </Button>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding-bottom: 10px;
  > button {
    cursor: pointer;
    flex: 0 0 auto;
    width: 100px;
    height: 32px;
    border-radius: 4px;
    padding: 8px 12px;
    gap: 7px;
    border: 1px solid var(--gray-100);
    margin-right: 10px;
  }
`;

export default RankingTabMenu;
