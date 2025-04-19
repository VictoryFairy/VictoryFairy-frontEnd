import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import { UserInfo } from "@/types/User";
import {
  checkEmailDuplicate,
  requestEmailVerificationCode,
} from "@/api/auth/auth.api";
import TitleSection from "../common/TitleSection";
import InputField from "../common/InputField";
import Button from "../common/Button";

interface EmailValidProps {
  setstep: (step: number) => void;
  handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
  changePassword: boolean;
}
const schema = z.object({
  email: z.string().email("유효하지 않은 이메일 주소입니다."),
});

const EmailValid = ({
  setstep,
  handleSetUserInfo,
  changePassword = false,
}: EmailValidProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  type FormData = z.infer<typeof schema>;

  const emailValue = watch("email");

  const isButtonDisabled = !emailValue || isSubmitting;

  const onSubmit = async (data: FormData) => {
    try {
      const res = await checkEmailDuplicate(data.email);
      if (res.isExist) {
        const isSocialLogin = res.initialSignUpType === "social";
        const errorMessages = {
          changePassword:
            "소셜 로그인으로 가입하신 계정은 비밀번호 변경이 불가능합니다.",
          signup: {
            social: "소셜 로그인으로 가입하신 계정입니다",
            email: "이메일 로그인으로 가입하신 계정입니다",
          },
        };

        if (changePassword && isSocialLogin) {
          setError("email", {
            type: "manual",
            message: errorMessages.changePassword,
          });
          return;
        }

        if (!changePassword) {
          setError("email", {
            type: "manual",
            message: errorMessages.signup[isSocialLogin ? "social" : "email"],
          });
          return;
        }
      }

      await requestEmailVerificationCode({ email: data.email });
      handleSetUserInfo({ email: data.email });
      setstep(2);
    } catch (error) {
      setError("email", {
        type: "manual",
        message:
          "이메일 인증 코드 전송 중 오류가 발생했습니다. 다시 시도해 주세요.",
      });
    }
  };
  return (
    <Container>
      <TitleSection
        title='승리요정님의 이메일을 알려주세요'
        subtitle='비밀번호 변경에 필요한 인증번호를 이메일로 보내드릴게요'
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <InputField
            name='email'
            label='이메일'
            placeholder='이메일 입력'
            register={register}
            watch={watch}
            setValue={setValue}
            error={errors.email}
            hasLabel={false}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button variant='default' type='submit' disabled={isButtonDisabled}>
            확인
          </Button>
        </ButtonWrapper>
      </Form>
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
`;

const ButtonWrapper = styled.div``;

export default EmailValid;
