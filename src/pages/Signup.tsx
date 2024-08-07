import { useState } from "react";
import EmailValid from "../components/signup/EmailValid";
import VerificationCode from "../components/signup/VerificationCode";

interface UserInfo {
  email: string;
  verificationCode: string;
  nickname: string;
  profilePicture: string;
  password: string;
  team: string;
}

const Signup = () => {
  const [step, setstep] = useState(1);
  const [userInfo, setuserInfo] = useState<UserInfo | null>(null);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmailValid setstep={setstep} />;
      case 2:
        return <VerificationCode />;
      case 3:
        return <div>ㅗㅇ</div>;
      case 4:
        return <div>ㅗㅇ</div>;
      case 5:
        return <div>ㅗㅇ</div>;
      default:
        return null;
    }
  };
  return <div style={{ height: "100%", padding: "20px" }}>{renderStep()}</div>;
};

export default Signup;
