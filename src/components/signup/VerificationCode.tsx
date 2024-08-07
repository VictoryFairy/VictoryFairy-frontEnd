import { useState } from "react";
import { UserInfo } from "../../types/User";
import OTPInput from "../common/OTPInput";
import TitleSection from "../common/TitleSection";
import Button from "../common/Button";

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

  return (
    <div>
      <TitleSection
        title='이메일로 보내드린<br/>인증 코드를 입력해주세요'
        subtitle={`${email}로 보내드린<br/>인증번호 5자리를 입력해주세요`}
      />
      <OTPInput otp={otp} setOtp={setOtp} />
      <Button type='button' onClick={() => {}} variant='primary'>
        확인
      </Button>
    </div>
  );
};

export default VerificationCode;
