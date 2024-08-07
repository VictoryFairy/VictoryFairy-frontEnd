import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/common/Button";
import TitleSection from "../components/common/TitleSection";
import InputField from "../components/common/InputField";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({});

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const isButtonDisabled = !emailValue || !passwordValue;

  return (
    <Container>
      <TitleSection title='이메일과 비밀번호를 입력해주세요' />
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
          />
          <InputField
            name='password'
            label='비밀번호 '
            placeholder='비밀번호 입력'
            type='password'
            register={register}
            watch={watch}
            setValue={setValue}
            error={errors.password}
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
  padding: 20px;
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

export default Login;
