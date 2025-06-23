import TextAreaField from "@/components/common/TextAreaField";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text";
import { Team } from "@/types/Game";
import { typography } from "@/style/typography";
import CheerTeamSelect from "./CheerTeamSelect";

interface RegisterFormFieldsProps {
  onSubmit: (data: any) => void;
  watch: any;
  register: any;
  setValue: any;
  homeTeam: Team;
  awayTeam: Team;
  isReviewValid?: any;
  clearErrors?: any;
}

const RegisterFormFields = ({
  onSubmit,
  watch,
  register,
  setValue,
  homeTeam,
  awayTeam,
  isReviewValid,
  clearErrors,
}: RegisterFormFieldsProps) => {
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isErrorCleared, setIsErrorCleared] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const { ref, ...rest } = register("img");

  // 실제 에러 상태 계산 (로컬 상태로 오버라이드)
  const actualErrorState = isReviewValid && !isErrorCleared;

  // 에러 상태가 변할 때 흔들림 애니메이션 트리거
  useEffect(() => {
    if (actualErrorState) {
      setShouldShake(true);
      // 애니메이션이 끝난 후 상태 리셋
      const timer = setTimeout(() => {
        setShouldShake(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [actualErrorState]);

  // 메모 입력란 auto-resize용 핸들러
  const handleReviewInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    // 에러가 있을 때 사용자가 다시 입력을 시작하면 에러를 클리어
    if (isReviewValid && !isErrorCleared) {
      clearErrors("review");
      setIsErrorCleared(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    // 폼 제출 시 에러 클리어 상태 리셋
    setIsErrorCleared(false);
    onSubmit(e);
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

  return (
    <Form onSubmit={handleSubmit}>
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
        className='seat-input'
        placeholder='123존 12열 1번'
        setValue={setValue}
        register={register}
        watch={watch}
        name='seat'
        type='input'
      />
      <TextAreaField
        className='review-textarea'
        label='메모*'
        placeholder='직관 한 마디!'
        setValue={setValue}
        register={register}
        watch={watch}
        name='review'
        onInput={handleReviewInput}
        maxLength={200}
        rows={1}
        validation={{
          minLength: 10,
        }}
        error={actualErrorState}
      />
      <ShakeText
        className='validation-text'
        variant='caption'
        color={actualErrorState ? "red" : "var(--gray-500)"}
        $shouldShake={shouldShake}>
        최소 10글자 이상 입력해주세요.
      </ShakeText>
      <Button
        size='big'
        type='submit'
        disabled={
          !watch("cheeringTeamId") ||
          !watch("seat") ||
          !watch("review") ||
          actualErrorState
        }>
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

  ::placeholder {
    color: var(--disabled-on);
  }

  label {
    margin-bottom: 0;
    color: var(--gray-700);
    ${typography.caption}
  }

  .seat-input {
    border-bottom: 1px solid var(--gray-400);
    box-shadow: none;
    margin-bottom: -16px;
  }

  .review-textarea {
    padding: 8px 0px 8px 0px;
    min-height: 0px;
    border-bottom: 1px solid var(--gray-400);
  }

  .validation-text {
    margin-top: -40px;
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

const ShakeText = styled(Text)<{ $shouldShake: boolean }>`
  animation: ${({ $shouldShake }) =>
    $shouldShake ? "shake 0.5s ease-in-out" : "none"};

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    10% {
      transform: translateX(-4px);
    }
    20% {
      transform: translateX(4px);
    }
    30% {
      transform: translateX(-3px);
    }
    40% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-2px);
    }
    60% {
      transform: translateX(2px);
    }
    70% {
      transform: translateX(-1px);
    }
    80% {
      transform: translateX(1px);
    }
    90% {
      transform: translateX(-0.5px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export default RegisterFormFields;
