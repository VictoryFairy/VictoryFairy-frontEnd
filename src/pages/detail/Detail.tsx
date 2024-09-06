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
import TextAreaField from "../../components/common/TextAreaField";
import InputField from "../../components/common/InputField";

const Detail = () => {
  const location = useLocation();
  const id = +location.pathname.split("/")[2];
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const { openPopup, renderPopup, closePopup } = usePopup(); // usePopup 사용

  const { data } = useQuery({
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
    data?.image || null,
  );

  const inputImgRef = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register("img");

  useEffect(() => {
    if (data) {
      reset({
        cheeringTeam: data.cheeringTeam.name,
        seat: data.seat,
        review: data.review,
      });
      setPreviewImage(data.image);
    }
  }, [data, reset]);

  const onSubmit = (formData: any) => {
    updateMutation.mutate(formData);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
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
    if (isEditing) {
      inputImgRef.current?.click();
    }
  };

  if (!data) return null;

  return (
    <Layout>
      <Header>
        <div>
          <Icon icon='IcArrowLeft' onClick={() => navigate(-1)} />
        </div>
        <div>
          <Text variant='headline'>{`${data.game.date} ${data.game.homeTeam.name} vs ${data.game.awayTeam.name}`}</Text>
        </div>
        <div>
          <DropDown onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </Header>
      <GameListItem className='match' match={data} />
      <DetailContainer onSubmit={handleSubmit(onSubmit)}>
        <input
          className='img-input'
          type='file'
          accept='image/jpg, image/jpeg, image/png'
          {...rest}
          ref={inputImgRef}
          onChange={handleImageChange}
        />
        <ImgUploadContainer
          isEditing={isEditing}
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
        <InputField
          name='cheeringTeam'
          label='응원팀'
          type='text'
          register={register}
          watch={watch}
          setValue={setValue}
          disabled
          clearable={false}
        />
        <InputField
          name='seat'
          label='좌석'
          type='text'
          register={register}
          watch={watch}
          setValue={setValue}
          disabled={!isEditing}
          clearable={false}
        />
        <TextAreaField
          name='review'
          label='메모'
          register={register}
          watch={watch}
          setValue={setValue}
          disabled={!isEditing}
        />
        {isEditing && (
          <Button size='big' type='submit'>
            <Text variant='title_02'>수정완료</Text>
          </Button>
        )}
      </DetailContainer>
      {renderPopup()}
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  min-height: 100vh;
  margin: auto;
  position: relative;
  padding: 20px;
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
  hasImage: boolean;
  isEditing: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${({ hasImage }) =>
    hasImage ? "none" : "1px dashed var(--gray-200)"};
  border-radius: 12px;
  height: 180px;
  width: 100%;
  cursor: ${({ isEditing }) => (isEditing ? "pointer" : "default")};
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
