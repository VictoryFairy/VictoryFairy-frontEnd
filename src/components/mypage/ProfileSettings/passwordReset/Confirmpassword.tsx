import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { changePassword } from "@/api/auth/auth.api";
import { usePopup } from "@/hooks/usePopup";
import Button from "../../../common/Button";
import InputField from "../../../common/InputField";
import TitleSection from "../../../common/TitleSection";

interface ConfirmpasswordProps {
  password: string;
  email: string;
  setstep: (step: number) => void;
}
interface ResetpasswordFormData {
  password: string;
  confirmPassword: string;
}
const Confirmpassword = ({
  password,
  email,
  setstep,
}: ConfirmpasswordProps) => {
  const { openPopup, renderPopup, closePopup } = usePopup();
  const navigate = useNavigate();
  const { register, watch, handleSubmit, setValue } =
    useForm<ResetpasswordFormData>({
      mode: "onChange",
    });

  const onSubmit = async (data: ResetpasswordFormData) => {
    try {
      await changePassword({ email, password: data.confirmPassword });
      openPopup({
        title: "비밀번호 변경 성공",
        message: "성공적으로 비밀번호 변경이 완료되었습니다!",
        buttons: [
          {
            label: "확인",
            variant: "confirm",
            onClick: () => {
              navigate("/login");
              setstep(1);
            },
          },
        ],
      });
    } catch (err) {
      openPopup({
        title: "비밀번호 변경 실패",
        message: "비밀번호 변경에 실패했습니다. 다시 시도해 주세요.",
        buttons: [
          {
            label: "확인",
            variant: "confirm",
            onClick: closePopup,
          },
        ],
      });
    }
  };
  const passwordValue = password;
  const confirmPasswordValue = watch("confirmPassword");

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
`;

const ButtonWrapper = styled.div``;
export default Confirmpassword;
