import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import { UserInfo } from "@/types/User";
import { typography } from "@/style/typography";
import TitleSection from "../../../common/TitleSection";
import InputField from "../../../common/InputField";
import Button from "../../../common/Button";
import Icon from "../../../common/Icon";

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
    setstep(4);
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
      <TitleSection title='새로운 비밀번호를 설정해주세요' />
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
  font-size: 14px;
  margin-top: 5px;
`;
const StyledIcon = styled(Icon)`
  margin-right: 8px;
`;
export default PasswordValid;
