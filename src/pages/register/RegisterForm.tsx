import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Game, MyGame } from "@/types/Game";
import { useForm } from "react-hook-form";
import TextAreaField from "@/components/common/TextAreaField";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import { useImperativeHandle, useRef, useState } from "react";
import InputField from "@/components/common/InputField";
import { postRegisterGame } from "@/api/register/register";
import { uploadImg } from "@/utils/uploadImg";
import { usePopup } from "@/hooks/usePopup";
import { useAuthStore } from "@/store/authStore";
import { getTeamName } from "@/utils/getTeamName";
import ResultLabel from "@/components/watchList/ListTab/ResultLabel";
import Text from "../../components/common/Text";
import { GameListItemContainer } from "../../components/common/GameListItem";

const RegisterForm = () => {
  const location = useLocation();
  const { match } = location.state as { match: Game };
  const matchId = match.id;
  const { register, watch, handleSubmit, setValue } = useForm();
  const inputImgRef = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register("img");
  useImperativeHandle(ref, () => inputImgRef.current);
  const { teamId } = useAuthStore();

  const { Popup, isOpen, openPopup } = usePopup();

  // 급하게 임시방편으로 만든 상태라 추후 리팩토링이 필요함
  const [popupMessage, setPopupMessage] = useState({
    title: "",
    message: "",
    type: "alert" as "alert" | "confirm",
    confirmFunc: () => {},
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

      // 성공 시 팝업 설정
      setPopupMessage({
        title: "직관 기록 완료",
        message: "직관 기록이 성공적으로 완료되었습니다.",
        type: "alert",
        confirmFunc: () => {
          window.location.href = "/home";
        },
      });

      openPopup();
    } catch (error) {
      console.error("직관 기록 오류:", error);

      // 에러 시 팝업 설정
      setPopupMessage({
        title: "직관 기록 실패",
        message: "직관 기록 중 오류가 발생했습니다. 다시 시도해주세요.",
        type: "alert",
        confirmFunc: () => {},
      });

      openPopup();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue("img", file);
    }
  };

  const handleClickImageUpload = () => {
    inputImgRef.current?.click();
  };

  let result = "" as Pick<MyGame, "status">["status"];
  if (match.winningTeam) {
    if (match.winningTeam.id === teamId) {
      result = "Win";
    } else {
      result = "Lose";
    }
  } else {
    result = "Tie";
  }
  if (!match.homeTeamScore && !match.awayTeamScore) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    result = "No game";
  }

  return (
    <RegisterFormContainer>
      {isOpen && (
        <Popup
          title={popupMessage.title}
          message={popupMessage.message}
          type={popupMessage.type}
          confirmFunc={popupMessage.confirmFunc}
        />
      )}
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

      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          className='img-input'
          type='file'
          accept='image/jpg, image/jpeg, image/png'
          {...rest}
          ref={inputImgRef}
          onChange={handleImageChange}
        />

        <ImgUploadContainer
          hasImage={!!previewImage}
          onClick={handleClickImageUpload}>
          {previewImage ? (
            <PreviewImage src={previewImage} alt='직관 사진' />
          ) : (
            <ImgWrraper>
              <Icon icon='IcCamera' width={24} height={24} />
              <Text variant='caption'>직관 사진을 업로드해주세요</Text>
            </ImgWrraper>
          )}
        </ImgUploadContainer>
        {/* <CheerTeamSelect
          setCheeringTeamId={setCheeringTeamId}
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
        /> */}
        <InputField
          label='응원팀'
          setValue={setValue}
          register={register}
          watch={watch}
          name='cheerTeam'
          type='input'
          disabled
          value={getTeamName(teamId)}
        />
        <InputField
          label='좌석'
          placeholder='123존 12열 1번'
          setValue={setValue}
          register={register}
          watch={watch}
          name='seat'
          type='input'
        />
        <TextAreaField
          label='메모'
          placeholder='직관 한 마디!'
          setValue={setValue}
          register={register}
          watch={watch}
          name='review'
        />
        <Button size='big'>직관 기록 하기</Button>
      </Form>
    </RegisterFormContainer>
  );
};

const RegisterFormContainer = styled.div`
  padding-bottom: 80px;
  .img-input {
    display: none;
  }
`;

const ImgUploadContainer = styled.label<{ hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${({ hasImage }) =>
    hasImage ? "none" : "1px dashed var(--gray-200)"};
  border-radius: 12px;
  height: 180px;
  width: 100%;
  cursor: pointer;
`;

const ImgWrraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--gray-200);
  gap: 10px;

  svg {
    fill: var(--gray-200);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 32px 20px;
  gap: 20px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

export default RegisterForm;
