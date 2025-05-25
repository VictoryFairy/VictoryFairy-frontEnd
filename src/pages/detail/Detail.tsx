import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getRegisteredGameById,
  updateRegisteredGame,
  deleteRegisteredGame,
} from "@/api/register/register";
import GameListItem from "@/components/common/GameListItem";
import Text from "@/components/common/Text";
import Icon from "@/components/common/Icon";
import DropDown from "@/components/detail/DropDown";
import styled from "styled-components";
import Button from "@/components/common/Button";
import { uploadImg } from "@/utils/uploadImg"; // Import the image upload utility
import { usePopup } from "@/hooks/usePopup"; // usePopup 사용
import CheerTeamSelect from "@/components/register/CheerTeamSelect";
import { typography } from "@/style/typography";
import { GAMESTATUS_CANCELED } from "@/constants";
import {
  GameResultType,
  GameStatusCanceledType,
  GameStatusType,
} from "@/types/Game";
import TextAreaField from "../../components/common/TextAreaField";
import InputField from "../../components/common/InputField";

const Detail = () => {
  const location = useLocation();
  const id = +location.pathname.split("/")[2];
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [$isEditing, setIsEditing] = useState(false);
  const { openPopup, renderPopup, closePopup } = usePopup(); // usePopup 사용

  const { data: registeredGame } = useQuery({
    queryKey: ["registeredGame", id],
    queryFn: () => getRegisteredGameById(id),
  });

  const { register, watch, setValue, reset, handleSubmit } = useForm({
    mode: "onChange",
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      if (updatedData.img) {
        updatedData.image = await uploadImg(updatedData.img);
      }
      return updateRegisteredGame(id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registeredGame", id] });
      queryClient.invalidateQueries({ queryKey: ["registeredGame"] });

      openPopup({
        title: "수정 완료",
        message: "게임 정보가 성공적으로 수정되었습니다.",
        buttons: [{ label: "확인", variant: "confirm", onClick: closePopup }],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteRegisteredGame(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registeredGame"] });
      navigate("/home");

      openPopup({
        title: "삭제 완료",
        message: "게임 정보가 삭제되었습니다.",
        buttons: [{ label: "확인", variant: "confirm", onClick: closePopup }],
      });
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(
    registeredGame?.image || null,
  );

  const inputImgRef = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register("img");

  useEffect(() => {
    if (registeredGame) {
      reset({
        cheeringTeamId: registeredGame.cheeringTeam.id,
        cheeringTeamName: registeredGame.cheeringTeam.name,
        seat: registeredGame.seat,
        review: registeredGame.review,
      });
      setPreviewImage(registeredGame.image);
    }
  }, [registeredGame, reset]);

  const onSubmit = (formData: any) => {
    updateMutation.mutate(formData);
    setIsEditing(!$isEditing);
  };

  const handleEdit = () => {
    setIsEditing(!$isEditing);
  };

  const handleDelete = () => {
    openPopup({
      title: "삭제 확인",
      message: "정말로 게임 정보를 삭제하시겠습니까?",
      buttons: [
        { label: "취소", variant: "cancel", onClick: closePopup },
        {
          label: "삭제",
          variant: "confirm",
          onClick: () => deleteMutation.mutate(),
        },
      ],
    });
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
    if ($isEditing) {
      inputImgRef.current?.click();
    }
  };

  if (!registeredGame) return null;

  const isCanceledGame = (status: GameStatusType) => {
    return GAMESTATUS_CANCELED.includes(status as GameStatusCanceledType);
  };

  const getResult = (): GameResultType => {
    if (watch("cheeringTeamId") === undefined) return null;
    if (isCanceledGame(registeredGame.game.status)) return "No game";
    if (watch("cheeringTeamId") === registeredGame.game.winningTeam.id) {
      return "Win";
    }
    if (
      registeredGame.game.status === "경기종료" &&
      registeredGame.game.winningTeam === null
    )
      return "Tie";
    return "Lose";
  };

  return (
    <Layout $isEditing={$isEditing}>
      <Header>
        <div>
          <Icon icon='IcArrowLeft' onClick={() => navigate(-1)} />
        </div>
        <div>
          <Text variant='headline'>{`${registeredGame.game.date.replace(
            /-/g,
            ".",
          )} ${registeredGame.game.homeTeam.name} vs ${registeredGame.game.awayTeam.name}`}</Text>
        </div>
        <div>
          <DropDown onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </Header>
      {/* 경기 결과 표시 */}

      <GameListItem
        result={$isEditing ? getResult() : registeredGame.status} // 서버 API 수정 후, registeredGame.status로 변경
        isWinningTeam={registeredGame.game.winningTeam}
        homeTeam={registeredGame.game.homeTeam}
        homeTeamScore={registeredGame.game.homeTeamScore}
        awayTeam={registeredGame.game.awayTeam}
        awayTeamScore={registeredGame.game.awayTeamScore}
        date={registeredGame.game.date}
        stadium={registeredGame.game.stadium}
        status={registeredGame.game.status}
      />
      {/* 직관 기록 수정 폼 */}
      <hr className='divider' />
      <DetailContainer onSubmit={handleSubmit(onSubmit)}>
        <input
          className='img-input'
          type='file'
          accept='image/jpg, image/jpeg, image/png'
          {...rest}
          ref={inputImgRef}
          onChange={handleImageChange}
        />
        {/* 직관 사진 업로드 컨테이너 */}
        <ImgUploadContainer
          $isEditing={$isEditing}
          $hasImage={!!previewImage}
          onClick={handleClickImageUpload}>
          {/* 직관 사진 미리보기 */}
          {previewImage ? (
            <PreviewImage src={previewImage} alt='직관 사진' />
          ) : (
            <ImgWrraper>
              <Icon icon='IcCamera' width={24} height={24} />
              <Text variant='caption'>직관 사진을 업로드해주세요</Text>
            </ImgWrraper>
          )}
        </ImgUploadContainer>
        {/* 응원팀 선택 컴포넌트 */}
        {$isEditing ? (
          <CheerTeamSelect
            homeTeam={registeredGame.game.homeTeam}
            awayTeam={registeredGame.game.awayTeam}
            setValue={setValue}
            watch={watch}
            name='cheeringTeamId'
            defaultValue={registeredGame.cheeringTeam.id}
          />
        ) : (
          <InputField
            name='cheeringTeamName'
            label='응원팀*'
            type='text'
            className='cheering-team-name'
            register={register}
            watch={watch}
            setValue={setValue}
            disabled
            clearable={false}
          />
        )}
        {/* 좌석 입력 필드 */}
        <InputField
          name='seat'
          label='좌석'
          type='text'
          register={register}
          watch={watch}
          setValue={setValue}
          disabled={!$isEditing}
          clearable={false}
        />
        {/* 메모 입력 필드 */}
        <TextAreaField
          name='review'
          label='메모'
          register={register}
          watch={watch}
          setValue={setValue}
          disabled={!$isEditing}
        />
        {/* 수정 완료 버튼 */}
        {$isEditing && (
          <Button size='big' type='submit'>
            <Text variant='title_02'>수정완료</Text>
          </Button>
        )}
      </DetailContainer>
      {renderPopup()}
    </Layout>
  );
};

const Layout = styled.div<{ $isEditing: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  min-height: 100vh;
  margin: auto;
  position: relative;
  padding: 20px;

  .match {
    border: none;
  }

  .divider {
    height: 16px;
    margin: 0px -20px;
    background-color: #efefef;
    border: none;
    margin-bottom: 20px;
  }

  label {
    margin-bottom: 0;
    color: var(--gray-700);
    ${typography.caption}
  }

  input {
    ${({ $isEditing }) =>
      !$isEditing &&
      `
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      padding: 12px 8px 8px;
      gap: 8px;
      box-shadow: none;
      background: #efefef;
      border-radius: 4px 4px 0px 0px;
    `}
  }

  textarea {
    ${({ $isEditing }) =>
      !$isEditing &&
      `
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      padding: 12px 8px 8px;
      gap: 8px;
      border: none;
      background: #efefef;
      border-radius: 4px 4px 0px 0px;
      ${typography.body_long_02}
    `}
  }
`;

const Header = styled.div`
  height: 64px;
  top: 0;
  max-width: 480px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  z-index: 1;
`;

const DetailContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background: #ffffff;

  .img {
    width: 100%;
    height: 180px;
    img {
      width: 100%;
      height: 100%;
      flex: 1;
      object-fit: cover;
      border-radius: 12px;
    }
  }
  .img-input {
    display: none;
  }
`;

const ImgUploadContainer = styled.label<{
  $hasImage: boolean;
  $isEditing: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${({ $hasImage }) =>
    $hasImage ? "none" : "1px dashed var(--gray-200)"};
  border-radius: 12px;
  height: 180px;
  width: 100%;
  cursor: ${({ $isEditing }) => ($isEditing ? "pointer" : "default")};
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

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

export default Detail;
