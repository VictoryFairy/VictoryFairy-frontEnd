import { useState } from "react";
import styled from "styled-components";
import { UserInfo } from "../../types/User";
import OTPInput from "../common/OTPInput";
import TitleSection from "../common/TitleSection";
import Button from "../common/Button";
import EmailVerificationTimer from "./EmailVerificationTimer";

interface VerificationCodeProps {
  email: string;
  setstep: (step: number) => void;
  handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
}

const VerificationCode = ({
  email,
  setstep,
  handleSetUserInfo,
}: VerificationCodeProps) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleClick = () => {
    console.log(otp.join(""));
    handleSetUserInfo({ verificationCode: otp.join(",") });
    setstep(3);
  };
  const handleResend = () => {};
  return (
    <Container>
      <div>
        <TitleSection
          title='이메일로 보내드린<br/>인증 코드를 입력해주세요'
          subtitle={`${email}로 보내드린<br/>인증번호 5자리를 입력해주세요`}
        />
        <OTPInput otp={otp} setOtp={setOtp} />
        <EmailVerificationTimer onResend={handleResend} />
      </div>

      <ButtonWrapper>
        <Button type='button' onClick={handleClick} variant='primary'>
          확인
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default VerificationCode;
