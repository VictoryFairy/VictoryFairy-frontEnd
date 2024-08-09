import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import TitleSection from "../components/common/TitleSection";
import InputField from "../components/common/InputField";
import { login } from "../api/auth/auth.api";
import { useAuthStore } from "../store/authStore";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { loginAction } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({});

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      if (response.acToken) {
        loginAction(response.acToken);
        navigate("/home");
      }
    } catch (err) {
      if (err) {
        setError("password", {
          type: "manual",
          message: "아이디 또는 비밀번호가 틀립니다.",
        });
      }
    }
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
          <ForgotPasswordLink to='/password-reset'>
            비밀번호 찾기
          </ForgotPasswordLink>
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
const ForgotPasswordLink = styled(Link)`
  color: black;
  display: flex;
  justify-content: flex-end;
`;
const ButtonWrapper = styled.div``;

export default Login;
