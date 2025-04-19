import { useState } from "react";
import EmailValid from "../components/signup/EmailValid";
import VerificationCode from "../components/signup/VerificationCode";
import ChangePwForm from "./ChangePwForm";

type UserInfo = {
  email: string;
  password: string;
};
const ChangePassword = () => {
  const [step, setstep] = useState(1);

  const [userInfo, setuserInfo] = useState<UserInfo>({
    email: "",
    password: "",
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
          <EmailValid
            setstep={setstep}
            handleSetUserInfo={handleSetUserInfo}
            changePassword
          />
        );
      case 2:
        return <VerificationCode email={userInfo.email} setstep={setstep} />;

      case 3:
        return <ChangePwForm email={userInfo.email} />;

      default:
        return null;
    }
  };
  return (
    <div style={{ height: "100%", paddingTop: "30px" }}>{renderStep()}</div>
  );
};

export default ChangePassword;
