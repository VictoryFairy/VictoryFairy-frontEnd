import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { usePopup } from "@/hooks/usePopup";
import { profileChange } from "@/api/mypage/mypage.api";
import { useAuthStore } from "@/store/authStore";
import Button from "../../common/Button";
import Text from "../../common/Text";
import { TeamInfo } from "@/types/TeamInfo";
import { teams } from "@/utils/getTeamDetail";

const TeamChange = () => {
  const navigate = useNavigate();
  const { renderPopup, openPopup } = usePopup();
  const [selectedTeam, setSelectedTeam] = useState<TeamInfo | null>(null);
  const { updateTeamId, teamId } = useAuthStore();
  useEffect(() => {
    if (teamId) {
      const team = teams.find((element) => element.id === teamId);
      if (team) {
        setSelectedTeam(team);
      }
    }
  }, []);
  const handleBtnClick = () => {
    if (selectedTeam) {
      profileChange("teamId", selectedTeam?.id);
      updateTeamId(selectedTeam?.id);
    }
    navigate("/mypage");
  };

  const handleTeamSelect = (team: TeamInfo) => {
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
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
  height: 80px;
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
`;

const ButtonWrapper = styled.div`
  margin: 20px 0;
  margin-bottom: 50px;
`;

export default TeamChange;
