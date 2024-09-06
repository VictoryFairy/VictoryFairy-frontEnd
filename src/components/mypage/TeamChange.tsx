import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { usePopup } from "@/hooks/usePopup";
import { profileChange } from "@/api/mypage/mypage.api";
import { useAuthStore } from "@/store/authStore";
import Button from "../common/Button";
import Text from "../common/Text";

interface Team {
  id: number;
  name: string;
  color: string;
  bg: string;
  borderColor: string;
}

const teams: Team[] = [
  {
    id: 7,
    name: "LG Twins",
    bg: "var(--lg-twins-red)",
    color: "var(--lg-twins-black)",
    borderColor: "transparent",
  },
  {
    id: 2,
    name: "Doosan Bears",
    bg: "var(--doosan-bears-navy)",
    color: "white",
    borderColor: "var(--doosan-bears-red)",
  },
  {
    id: 10,
    name: "Hanwha Eagles",
    bg: "var(--hanwha-eagles-black)",
    color: "var(--hanwha-eagles-orange)",
    borderColor: "transparent",
  },
  {
    id: 4,
    name: "SAMSUNG Lions",
    bg: "var(--samsung-lions-blue)",
    color: "white",
    borderColor: "transparent",
  },
  {
    id: 9,
    name: "KT Wiz",
    bg: "var(--kt-wiz-black)",
    color: "var(--kt-wiz-red)",
    borderColor: "transparent",
  },
  {
    id: 5,
    name: "SSG Landers",
    bg: "var(--ssg-landers-red)",
    color: "gold",
    borderColor: "transparent",
  },
  {
    id: 6,
    name: "NC Dinos",
    bg: "var(--nc-dinos-blue)",
    color: "var(--nc-dinos-gold)",
    borderColor: "transparent",
  },
  {
    id: 3,
    name: "KIA Tigers",
    bg: "var(--kia-tigers-black)",
    color: "var(--kia-tigers-red)",
    borderColor: "transparent",
  },
  {
    id: 1,
    name: "Lotte Giants",
    bg: "var(--lotte-giants-navy)",
    color: "var(--lotte-giants-red)",
    borderColor: "white",
  },
  {
    id: 8,
    name: "Kiwoom Heroes",
    bg: "var(--kiwoom-heroes-magenta)",
    color: "white",
    borderColor: "var(--kiwoom-heroes-pink)",
  },
];
const TeamChange = () => {
  const navigate = useNavigate();
  const { renderPopup, openPopup } = usePopup();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const { updateTeamId } = useAuthStore();

  const handleBtnClick = () => {
    if (selectedTeam) {
      profileChange("teamId", selectedTeam?.id);
      updateTeamId(selectedTeam?.id);
    }
    navigate("/mypage");
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleClickSave = () => {
    openPopup({
      title: "응원팀 변경 완료",
      message: "응원팀 변경이 완료되었습니다.",
      buttons: [
        {
          label: "확인",
          variant: "confirm",
          onClick: handleBtnClick,
        },
      ],
    });
  };
  return (
    <Container>
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
          onClick={handleClickSave}
          disabled={selectedTeam === null}>
          <Text variant='title_02'>저장</Text>
        </Button>
      </ButtonWrapper>
      {renderPopup()}
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
  margin: 20px 0;
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
  margin: 20px 0;
`;

export default TeamChange;
