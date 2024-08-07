import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import TitleSection from "../common/TitleSection";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { UserInfo } from "../../types/User";

interface PasswordValidProps {
  setstep: (step: number) => void;
  handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
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

const PasswordValid = ({ setstep, handleSetUserInfo }: PasswordValidProps) => {
  const { register, watch, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  type FormData = z.infer<typeof schema>;

  const passwordValue = watch("password");

  const onSubmit = (data: FormData) => {
    handleSetUserInfo({ password: data.password });
    setstep(5);
  };

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

  return (
    <Container>
      <TitleSection title='비밀번호를 설정해주세요' />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <InputField
            name='password'
            label='비밀번호 설정'
            placeholder='비밀번호 입력'
            type='password'
            register={register}
            watch={watch}
            setValue={setValue}
          />
          <ValidationMessage $isValid={lengthValid}>
            8글자 이상
          </ValidationMessage>
          <ValidationMessage $isValid={uppercaseValid}>
            대문자 1개 이상 포함
          </ValidationMessage>
          <ValidationMessage $isValid={specialCharValid}>
            특수문자 1개 이상 포함, 다음제외 : ( ), &lt; &gt;, &quot, ;
          </ValidationMessage>
        </InputWrapper>
        <ButtonWrapper>
          <Button type='submit' disabled={isButtonDisabled}>
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
  padding: 20px;
  box-sizing: border-box;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ValidationMessage = styled.p<{ $isValid: boolean }>`
  color: ${(props) => (props.$isValid ? "black" : "gray")};
  font-size: 14px;
  margin-top: 5px;
`;

export default PasswordValid;
