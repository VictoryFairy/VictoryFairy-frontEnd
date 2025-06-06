import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Game } from "@/types/Game";
import { postRegisterGame } from "@/api/register/register";
import { usePopup } from "@/hooks/usePopup";
import GameListItem from "@/components/common/GameListItem";
import styled from "styled-components";
import { uploadImg } from "@/utils/uploadImg";
import RegisterFormFields from "@/components/register/RegisterFormFields";
import { sendGaEvent } from "@/utils/sendGaEvent";

const RegisterForm = () => {
  const location = useLocation();
  const { match } = location.state as { match: Game };
  const matchId = match.id;
  const { register, watch, handleSubmit, setValue } = useForm();
  const { openPopup, renderPopup, closePopup } = usePopup();

  const onSubmit = async (data: any) => {
    sendGaEvent(
      "직관 기록 페이지",
      "직관 기록 하기 완료",
      "직관 기록 하기 버튼",
    );
    try {
      const { img, seat, review, cheeringTeamId } = data;
      const image = img ? await uploadImg(img, "registered-game") : null;

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
    if (watch("cheeringTeamId") === undefined) return null;
    if (match.winningTeam) {
      return match.winningTeam.id === watch("cheeringTeamId") ? "Win" : "Lose";
    }
    if (!match.homeTeamScore && !match.awayTeamScore) {
      return "No game";
    }
    return "Tie";
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
      <hr className='divider' />
      <RegisterFormFields
        onSubmit={handleSubmit(onSubmit)}
        watch={watch}
        register={register}
        setValue={setValue}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
      />

      {renderPopup()}
    </RegisterFormContainer>
  );
};

const RegisterFormContainer = styled.div`
  padding-bottom: 80px;
  .match {
    border: none;
  }

  .divider {
    height: 16px;
    margin: 0px -20px;
    background-color: #efefef;
    border: none;
  }
`;

export default RegisterForm;
