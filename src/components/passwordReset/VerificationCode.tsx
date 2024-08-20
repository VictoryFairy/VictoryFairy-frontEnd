import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import OTPInput from "../common/OTPInput";
import TitleSection from "../common/TitleSection";
import Button from "../common/Button";
import EmailVerificationTimer from "../signup/EmailVerificationTimer";
import {
  requestEmailVerificationCode,
  verifyEmailCode,
} from "@/api/auth/auth.api";

interface VerificationCodeProps {
  email: string;
  setstep: (step: number) => void;
}

const VerificationCode = ({ email, setstep }: VerificationCodeProps) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    try {
      const otpCode = otp.join("");
      await verifyEmailCode({ email, code: otpCode });

      setstep(3);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      }
    }
  };
  const handleResend = async () => {
    try {
      await requestEmailVerificationCode({ email });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          "이메일 인증 코드 전송 중 오류가 발생했습니다. 다시 시도해 주세요.",
        );
      }
    }
  };
  return (
    <Container>
      <div>
        <TitleSection
          title='이메일로 보내드린<br/>인증 코드를 입력해주세요'
          subtitle={`${email}로 보내드린<br/>인증번호 5자리를 입력해주세요`}
        />
        <OTPInput otp={otp} setOtp={setOtp} />
        <EmailVerificationTimer onResend={handleResend} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>

      <ButtonWrapper>
        <Button type='button' onClick={handleClick}>
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
  justify-content: space-between;
`;

const ButtonWrapper = styled.div``;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
export default VerificationCode;
