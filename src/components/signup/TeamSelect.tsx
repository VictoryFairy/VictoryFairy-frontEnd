import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TitleSection from "../common/TitleSection";
import Button from "../common/Button";
import { UserInfo } from "../../types/User";

interface Team {
  id: string;
  name: string;
  color: string;
  bg: string;
  borderColor: string;
}

interface TeamSelectProps {
  handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
}

const teams: Team[] = [
  {
    id: "lgtwins",
    name: "LG Twins",
    bg: "var(--lg-twins-red)",
    color: "var(--lg-twins-black)",
    borderColor: "transparent",
  },
  {
    id: "doosanbears",
    name: "Doosan Bears",
    bg: "var(--doosan-bears-navy)",
    color: "white",
    borderColor: "var(--doosan-bears-red)",
  },
  {
    id: "hanwhaeagles",
    name: "Hanwha Eagles",
    bg: "var(--hanwha-eagles-black)",
    color: "var(--hanwha-eagles-orange)",
    borderColor: "transparent",
  },
  {
    id: "samsunglions",
    name: "SAMSUNG Lions",
    bg: "var(--samsung-lions-blue)",
    color: "white",
    borderColor: "transparent",
  },
  {
    id: "ktwiz",
    name: "KT Wiz",
    bg: "var(--kt-wiz-black)",
    color: "var(--kt-wiz-red)",
    borderColor: "transparent",
  },
  {
    id: "ssglanders",
    name: "SSG Landers",
    bg: "var(--ssg-landers-red)",
    color: "gold",
    borderColor: "transparent",
  },
  {
    id: "ncdinos",
    name: "NC Dinos",
    bg: "var(--nc-dinos-blue)",
    color: "var(--nc-dinos-gold)",
    borderColor: "transparent",
  },
  {
    id: "kiatigeres",
    name: "KIA Tigers",
    bg: "var(--kia-tigers-black)",
    color: "var(--kia-tigers-red)",
    borderColor: "transparent",
  },
  {
    id: "lottegiants",
    name: "Lotte Giants",
    bg: "var(--lotte-giants-navy)",
    color: "var(--lotte-giants-red)",
    borderColor: "white",
  },
  {
    id: "kiwoomheroes",
    name: "Kiwoom Heroes",
    bg: "var(--kiwoom-heroes-magenta)",
    color: "white",
    borderColor: "var(--kiwoom-heroes-pink)",
  },
];

const TeamSelect = ({ handleSetUserInfo }: TeamSelectProps) => {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    handleSetUserInfo({ team: team.name });
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <TitleSection title='응원하는 팀을 선택해주세요' />
      <SelectedTeamBox
        color={selectedTeam?.color || "transparent"}
        bg={selectedTeam?.bg}
        borderColor={selectedTeam?.borderColor || "transparent"}>
        {selectedTeam?.name || "My Team"}
      </SelectedTeamBox>

      <TeamGrid>
        {teams.map((team) => (
          <TeamButton
            key={team.id}
            onClick={() => handleTeamSelect(team)}
            color={team.color}
            bg={team.bg}
            borderColor={team.borderColor}
            selected={selectedTeam?.id === team.id}>
            {team.name}
          </TeamButton>
        ))}
      </TeamGrid>

      <ButtonWrapper>
        <Button
          type='button'
          onClick={handleClick}
          disabled={selectedTeam === null}>
          승리요정 시작하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SelectedTeamBox = styled.div<{
  color: string;
  bg: string | undefined;
  borderColor: string;
}>`
  border: ${(props) =>
    props.color === "transparent" ? "1px dashed var(--gray-300)" : "none"};
  background-color: ${(props) => props.bg};
  color: ${(props) =>
    props.color === "transparent" ? "var(--gray-500)" : props.color};
  text-shadow:
    -1px -1px 0 ${(props) => props.borderColor},
    1px -1px 0 ${(props) => props.borderColor},
    -1px 1px 0 ${(props) => props.borderColor},
    1px 1px 0 ${(props) => props.borderColor};
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
  flex: 1;
`;

const TeamButton = styled.button<{
  bg: string;
  color: string;
  borderColor: string;
  selected: boolean;
}>`
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  text-shadow:
    -1px -1px 0 ${(props) => props.borderColor},
    1px -1px 0 ${(props) => props.borderColor},
    -1px 1px 0 ${(props) => props.borderColor},
    1px 1px 0 ${(props) => props.borderColor};
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  margin-top: 20px;
`;

export default TeamSelect;
