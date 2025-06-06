import TextAreaField from "@/components/common/TextAreaField";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useRef, useState } from "react";
import styled from "styled-components";
import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text";
import { Team } from "@/types/Team";
import { typography } from "@/style/typography";
import CheerTeamSelect from "./CheerTeamSelect";

interface RegisterFormFieldsProps {
  onSubmit: (data: any) => void;
  watch: any;
  register: any;
  setValue: any;
  homeTeam: Team;
  awayTeam: Team;
}

const RegisterFormFields = ({
  onSubmit,
  watch,
  register,
  setValue,
  homeTeam,
  awayTeam,
}: RegisterFormFieldsProps) => {
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { ref, ...rest } = register("img");

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

  return (
    <Form onSubmit={onSubmit}>
      <input
        className='img-input'
        type='file'
        accept='image/jpg, image/jpeg, image/png'
        {...rest}
        ref={inputImgRef}
        onChange={handleImageChange}
      />

      <ImgUploadContainer
        $hasImage={!!previewImage}
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
      <CheerTeamSelect
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        setValue={setValue}
        watch={watch}
        name='cheeringTeamId'
      />
      <InputField
        label='좌석*'
        placeholder='123존 12열 1번'
        setValue={setValue}
        register={register}
        watch={watch}
        name='seat'
        type='input'
      />
      <TextAreaField
        label='메모*'
        placeholder='직관 한 마디!'
        setValue={setValue}
        register={register}
        watch={watch}
        name='review'
      />
      <Button size='big' type='submit' disabled={!watch("cheeringTeamId")}>
        직관 기록 하기
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 32px 20px;
  gap: 20px;

  .img-input {
    display: none;
  }

  label {
    margin-bottom: 0;
    color: var(--gray-700);
    ${typography.caption}
  }
`;

const ImgUploadContainer = styled.label<{ $hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${({ $hasImage }) =>
    $hasImage ? "none" : "1px dashed var(--gray-200)"};
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

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

export default RegisterFormFields;
