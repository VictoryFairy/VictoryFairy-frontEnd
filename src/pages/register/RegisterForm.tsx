import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Game } from "@/types/Game";
import { postRegisterGame } from "@/api/register/register";
import { usePopup } from "@/hooks/usePopup";
import GameListItem from "@/components/common/GameListItem";
import styled from "styled-components";
import { uploadImg } from "@/utils/uploadImg";
import RegisterFormFields from "@/components/register/RegisterFormFields";
import { useState } from "react";

const RegisterForm = () => {
  const location = useLocation();
  const { match } = location.state as { match: Game };
  const matchId = match.id;
  const { register, watch, handleSubmit, setValue } = useForm();
  const [cheeringTeamId, setCheeringTeamId] = useState<number | null>(null);
  const { openPopup, renderPopup, closePopup } = usePopup();

  const onSubmit = async (data: any) => {
    try {
      const { img, seat, review } = data;
      let image = null;
      if (img) {
        image = await uploadImg(img);
      }

      const registerData = {
        gameId: matchId,
        image,
        seat,
        review,
        cheeringTeamId,
      };

      await postRegisterGame(registerData);

      openPopup({
        title: "직관 기록 완료",
        message: "직관 기록이 성공적으로 완료되었습니다.",
        buttons: [
          {
            label: "확인",
            variant: "confirm",
            onClick: () => {
              window.location.href = "/home";
            },
          },
        ],
      });
    } catch (error) {
      openPopup({
        title: "직관 기록 실패",
        message:
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.",
        buttons: [{ label: "확인", variant: "confirm", onClick: closePopup }],
      });
    }
  };

  const getResult = () => {
    if (cheeringTeamId === null) return null;
    if (match.winningTeam) {
      return match.winningTeam.id === cheeringTeamId ? "Win" : "Lose";
    } else if (!match.homeTeamScore && !match.awayTeamScore) {
      return "No game";
    } else {
      return "Tie";
    }
  };

  return (
    <RegisterFormContainer>
      <GameListItem
        result={getResult() || null}
        status={match.status}
        isWinningTeam={match.winningTeam}
        homeTeam={match.homeTeam}
        homeTeamScore={match.homeTeamScore}
        awayTeam={match.awayTeam}
        awayTeamScore={match.awayTeamScore}
        date={match.date}
        stadium={match.stadium}
      />
      <RegisterFormFields
        onSubmit={handleSubmit(onSubmit)}
        watch={watch}
        register={register}
        setValue={setValue}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        setCheeringTeamId={setCheeringTeamId}
      />

      {renderPopup()}
    </RegisterFormContainer>
  );
};

const RegisterFormContainer = styled.div`
  padding-bottom: 80px;
`;

export default RegisterForm;
