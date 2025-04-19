import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import { typography } from "@/style/typography";
import InputField from "@/components/common/InputField";
import TitleSection from "@/components/common/TitleSection";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { changePassword } from "@/api/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { usePopup } from "@/hooks/usePopup";
import axios from "axios";

interface ChangePwFormProps {
  email: string;
}

const schema = z.object({
  password: z
    .string()
    .min(8, "최소 8자리 이상이어야 합니다")
    .regex(/[A-Z]/, "대문자 1개 이상 포함")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      '특수기호(!@#$%^&*(),.?":{}|<>) 1개 이상 포함',
    ),
});

const ChangePwForm = ({ email }: ChangePwFormProps) => {
  const navigate = useNavigate();
  const { renderPopup, openPopup, closePopup } = usePopup();

  const successMessage = () => {
    openPopup({
      title: "비밀번호 변경 성공",
      message: `비밀번호가 변경되었습니다.`,
      buttons: [
        {
          label: "확인",
          variant: "confirm",
          onClick: () => {
            closePopup();
            navigate("/mypage");
          },
        },
      ],
    });
  };
  const alertMessage = () => {
    openPopup({
      title: "비밀번호 변경 실패",
      message: `일시적인 문제로 비밀번호 변경에 실패하였습니다. 나중에 다시 시도해 주세요.`,
      buttons: [
        {
          label: "확인",
          variant: "confirm",
          onClick: () => {
            closePopup();
            navigate("/mypage");
          },
        },
      ],
    });
  };

  const socialError = () => {
    openPopup({
      title: "비밀번호 변경 실패",
      message: `소셜로그인 계정은 비밀번호 변경이 불가능합니다.`,
      buttons: [
        {
          label: "확인",
          variant: "confirm",
          onClick: () => {
            closePopup();
            navigate("/mypage");
          },
        },
      ],
    });
  };
  const { register, watch, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  type FormData = z.infer<typeof schema>;

  const passwordValue = watch("password");

  const validatePassword = (value: string) => {
    const lengthValid = value?.length >= 8;
    const uppercaseValid = /[A-Z]/.test(value);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    return {
      lengthValid,
      uppercaseValid,
      specialCharValid,
    };
  };

  const { lengthValid, uppercaseValid, specialCharValid } =
    validatePassword(passwordValue);

  const isButtonDisabled =
    !passwordValue || !lengthValid || !uppercaseValid || !specialCharValid;

  const onSubmit = async (data: FormData) => {
    try {
      await changePassword({ email, password: data.password });
      successMessage();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          socialError();
        } else {
          alertMessage();
        }
      }
    }
  };
  return (
    <Container>
      <TitleSection title='비밀번호를 변경해주세요' />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <InputField
            name='password'
            label='비밀번호 변경'
            placeholder='비밀번호 입력'
            type='password'
            register={register}
            watch={watch}
            setValue={setValue}
          />
          <p className='message'>비밀번호에 다음 사항들을 포함해 주세요:</p>
          <ValidationMessage $isValid={lengthValid}>
            <StyledIcon
              icon='IcArrowDown'
              fill={lengthValid ? "black" : "gray"}
            />
            8글자 이상
          </ValidationMessage>
          <ValidationMessage $isValid={uppercaseValid}>
            <StyledIcon
              icon='IcArrowDown'
              fill={uppercaseValid ? "black" : "gray"}
            />
            대문자 1개 이상 포함
          </ValidationMessage>
          <ValidationMessage $isValid={specialCharValid}>
            <StyledIcon
              icon='IcArrowDown'
              fill={specialCharValid ? "black" : "gray"}
            />
            특수문자 1개 이상 포함, 다음제외 : ( ), &lt; &gt;, &quot, ;
          </ValidationMessage>
        </InputWrapper>
        <ButtonWrapper>
          <Button type='submit' disabled={isButtonDisabled}>
            확인
          </Button>
        </ButtonWrapper>
      </Form>
      {renderPopup()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  flex: 1;
  .message {
    margin-bottom: 12px;
    ${typography.body_01}
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ValidationMessage = styled.p<{ $isValid: boolean }>`
  color: ${(props) => (props.$isValid ? "black" : "gray")};
  font-weight: ${(props) => (props.$isValid ? "bold" : "gray")};
  font-size: 14px;
  margin-top: 5px;
`;

const StyledIcon = styled(Icon)`
  margin-right: 8px;
`;
export default ChangePwForm;
