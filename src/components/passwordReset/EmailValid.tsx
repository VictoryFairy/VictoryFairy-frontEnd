import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import TitleSection from "../common/TitleSection";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { UserInfo } from "../../types/User";

interface EmailValidProps {
  setstep: (step: number) => void;
  handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
}
const schema = z.object({
  email: z.string().email("유효하지 않은 이메일 주소입니다."),
});
const EmailValid = ({ setstep, handleSetUserInfo }: EmailValidProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  type FormData = z.infer<typeof schema>;

  const emailValue = watch("email");

  const isButtonDisabled = !emailValue;

  const onSubmit = (data: FormData) => {
    console.log(data);
    handleSetUserInfo({ email: data.email });
    setstep(2);
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
            maxLength={50}
            register={register}
            watch={watch}
            setValue={setValue}
            error={errors.email}
          />
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
`;

const ButtonWrapper = styled.div``;
export default EmailValid;
