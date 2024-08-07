import { useState } from "react";
import styled from "styled-components";
import TitleSection from "../common/TitleSection";

const teams = [
  { id: 1, name: "LG Twins", color: "#DC143C" },
  { id: 2, name: "Doosan Bears", color: "#000080" },
  // ... 다른 팀들 추가
];

const TeamSelect = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [noTeam, setNoTeam] = useState(false);

  const handleTeamSelect = (teamName: string) => {
    setSelectedTeam(teamName);
    setNoTeam(false);
  };

  return (
    <Container>
      <Header>
        <TitleSection title='응원팀을 선택해주세요' />
      </Header>

      <TeamBox selected={!!selectedTeam}>{selectedTeam || "My Team"}</TeamBox>

      <TeamGrid>
        {teams.map((team) => (
          <TeamButton
            key={team.id}
            onClick={() => handleTeamSelect(team.name)}
            style={{
              backgroundColor: team.color,
            }}>
            {team.name}
          </TeamButton>
        ))}
      </TeamGrid>

      <SubmitButton disabled={!selectedTeam && !noTeam}>
        승리요정 시작하기
      </SubmitButton>
    </Container>
  );
};

// Styled components 정의
const Container = styled.div`
  // ... 스타일 정의
`;

const Header = styled.div`
  // ... 스타일 정의
`;

const TeamBox = styled.div<{ selected: boolean }>`
  // ... 스타일 정의
`;

const NoTeamCheckbox = styled.label`
  // ... 스타일 정의
`;

const TeamGrid = styled.div`
  // ... 스타일 정의
`;

const TeamButton = styled.button`
  display: grid;
  // ... 스타일 정의
`;

const SubmitButton = styled.button`ㅉ
  // ... 스타일 정의
`;

export default TeamSelect;
