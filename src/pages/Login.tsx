import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { typography } from "@/style/typography";
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

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await login(data);
    },
    onSuccess: (response) => {
      if (response.acToken) {
        loginAction(response.acToken, response.teamId);
        navigate("/home");
      }
    },
    onError: (err: Error) => {
      setError("password", {
        type: "manual",
        message: err.message,
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const isButtonDisabled =
    !emailValue || !passwordValue || loginMutation.isPending;

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
  padding-top: 30px;
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
  display: flex;
  justify-content: flex-end;
  ${typography.subtitle_01}
  color: black;
`;
const ButtonWrapper = styled.div``;

export default Login;
