import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Game, MyGame } from "@/types/Game";
import { postRegisterGame } from "@/api/register/register";
import { useAuthStore } from "@/store/authStore";
import { usePopup } from "@/hooks/usePopup";
import { GameListItemContainer } from "@/components/common/GameListItem";
import ResultLabel from "@/components/common/ResultLabel";
import Text from "@/components/common/Text";
import styled from "styled-components";
import Icon from "@/components/common/Icon";
import { uploadImg } from "@/utils/uploadImg";
import RegisterFormFields from "@/components/register/RegisterFormFields";

const RegisterForm = () => {
  const location = useLocation();
  const { match } = location.state as { match: Game };
  const matchId = match.id;
  const { register, watch, handleSubmit, setValue } = useForm();
  const { teamId } = useAuthStore();
  const { openPopup, renderPopup, closePopup } = usePopup();

  const onSubmit = async (data: any) => {
    try {
      const { img, seat, review } = data;
      let image = null;
      if (img.size > 0) {
        image = await uploadImg(img);
      }

      const registerData = {
        gameId: matchId,
        image,
        seat,
        review,
        cheeringTeamId: teamId,
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

  let result = "" as Pick<MyGame, "status">["status"];
  if (match.winningTeam) {
    result = match.winningTeam.id === teamId ? "Win" : "Lose";
  } else if (!match.homeTeamScore && !match.awayTeamScore) {
    result = "No game";
  } else {
    result = "Tie";
  }

  return (
    <RegisterFormContainer>
      <GameListItemContainer>
        <ResultLabel status={result}>{result}</ResultLabel>
        <div className='game-info'>
          <div className='team-score'>
            <Text variant='subtitle_02'>{match.homeTeam.name}</Text>
            <Text variant='subtitle_02'>{match.homeTeamScore}</Text>
          </div>
          <div className='team-score'>
            <Text variant='subtitle_02'>{match.awayTeam.name}</Text>
            <Text variant='subtitle_02'>{match.awayTeamScore}</Text>
          </div>
        </div>
        <div className='vertical-line' />
        <div className='game-info-stadium'>
          <Text variant='caption'>{match.date}</Text>
          <Text variant='caption'>
            <Icon icon='IcLocation' width={16} height={16} />
            {match.stadium.name} 야구장
          </Text>
        </div>
      </GameListItemContainer>

      <RegisterFormFields
        onSubmit={handleSubmit(onSubmit)}
        watch={watch}
        register={register}
        setValue={setValue}
      />

      {renderPopup()}
    </RegisterFormContainer>
  );
};

const RegisterFormContainer = styled.div`
  padding-bottom: 80px;
`;

export default RegisterForm;
