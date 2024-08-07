import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import InputField from "../common/InputField";
import TitleSection from "../common/TitleSection";

interface ConfirmpasswordProps {
  password: string;
}
interface ResetpasswordFormData {
  password: string;
  confirmPassword: string;
}
const Confirmpassword = ({ password }: ConfirmpasswordProps) => {
  const { register, watch, handleSubmit, setValue } =
    useForm<ResetpasswordFormData>({
      mode: "onChange",
    });

  const onSubmit = (data: ResetpasswordFormData) => {
    console.log(data);
  };
  const passwordValue = password;
  const confirmPasswordValue = watch("confirmPassword");

  console.log(passwordValue, confirmPasswordValue);

  const isButtonDisabled =
    !passwordValue ||
    !confirmPasswordValue ||
    passwordValue !== confirmPasswordValue;

  const isPasswordMatch = passwordValue === confirmPasswordValue;
  return (
    <Container>
      <TitleSection title='새로운 비밀번호를<br/>한 번 더 입력해주세요' />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <InputField
            name='password'
            label='비밀번호'
            placeholder='비밀번호 입력'
            type='password'
            value={password}
            register={register}
            watch={watch}
            setValue={setValue}
            disabled
          />
          <InputField
            name='confirmPassword'
            label='비밀번호 확인'
            placeholder='비밀번호 입력'
            type='password'
            register={register}
            watch={watch}
            setValue={setValue}
            error={
              isPasswordMatch
                ? undefined
                : { message: "비밀번호가 일치하지 않습니다.", type: "manual" }
            }
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button type='submit' disabled={isButtonDisabled}>
            제출
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
export default Confirmpassword;
