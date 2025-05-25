import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Game, GameResultType } from "@/types/Game";
import { postRegisterGame } from "@/api/register/register";
import { usePopup } from "@/hooks/usePopup";
import GameListItem from "@/components/common/GameListItem";
import styled from "styled-components";
import { uploadImg } from "@/utils/uploadImg";
import RegisterFormFields from "@/components/register/RegisterFormFields";
import { sendGaEvent } from "@/utils/sendGaEvent";
import { isCanceledGame } from "@/utils/isCanceledGame";

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

  const getResult = (): GameResultType => {
    const isCheeringTeamNotSelected = () => {
      return watch("cheeringTeamId") === undefined;
    };
    const isScoreTie = () => {
      return match.homeTeamScore === match.awayTeamScore;
    };

    if (isCanceledGame(match.status)) {
      return "No game";
    }

    if (isCheeringTeamNotSelected()) {
      if (isScoreTie()) {
        return "Tie";
      }
      return null;
    }

    switch (match.status) {
      case "경기전":
      case "경기중":
        return null;
      case "경기종료":
        if (match.winningTeam) {
          return match.winningTeam.id === watch("cheeringTeamId")
            ? "Win"
            : "Lose";
        }
        if (!match.homeTeamScore && !match.awayTeamScore) {
          return "No game";
        }
        if (isScoreTie()) {
          return "Tie";
        }
        return null;
      default:
        return null;
    }

    // if (match.st) return null;
    // if (match.winningTeam) {
    //   return match.winningTeam.id === watch("cheeringTeamId") ? "Win" : "Lose";
    // }
    // if (!match.homeTeamScore && !match.awayTeamScore) {
    //   return "No game";
    // }
    // return "Tie";
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
