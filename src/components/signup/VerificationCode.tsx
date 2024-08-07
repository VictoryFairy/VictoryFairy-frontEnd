import { UserInfo } from "../../types/User";
import TitleSection from "../common/TitleSection";

interface VerificationCodeProps {
  setstep: (step: number) => void;
  handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
}

const VerificationCode = ({
  setstep,
  handleSetUserInfo,
}: VerificationCodeProps) => {
  return (
    <div>
      <TitleSection
        title='이메일로 보내드린<br/>인증 코드를 입력해주세요'
        subtitle='회원가입에 필요한 인증번호를 이메일로 보내드릴게요'
      />
    </div>
  );
};

export default VerificationCode;
