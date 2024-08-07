import { useState } from "react";
import EmailValid from "../components/signup/EmailValid";
import VerificationCode from "../components/signup/VerificationCode";
import { UserInfo } from "../types/User";
import Profile from "../components/signup/Profile";
import PasswordValid from "../components/signup/PasswordValid";

const Signup = () => {
  const [step, setstep] = useState(1);
  const [userInfo, setuserInfo] = useState<UserInfo>({
    email: "",
    verificationCode: "",
    nickname: "",
    profilePicture: "",
    password: "",
    team: "",
  });

  const handleSetUserInfo = (updatedUserInfo: Partial<UserInfo>) => {
    setuserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ...updatedUserInfo,
    }));
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailValid setstep={setstep} handleSetUserInfo={handleSetUserInfo} />
        );
      case 2:
        return (
          <VerificationCode
            email={userInfo.email}
            setstep={setstep}
            handleSetUserInfo={handleSetUserInfo}
          />
        );
      case 3:
        return (
          <Profile setstep={setstep} handleSetUserInfo={handleSetUserInfo} />
        );
      case 4:
        return (
          <PasswordValid
            setstep={setstep}
            handleSetUserInfo={handleSetUserInfo}
          />
        );
      case 5:
        return <div>ㅗㅇ</div>;
      default:
        return null;
    }
  };
  return <div style={{ height: "100%", padding: "20px" }}>{renderStep()}</div>;
};

export default Signup;
