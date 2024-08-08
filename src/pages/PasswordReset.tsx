import { useState } from "react";
import EmailValid from "../components/passwordReset/EmailValid";
import VerificationCode from "../components/passwordReset/VerificationCode";
import PasswordValid from "../components/passwordReset/PassWordReset";
import Confirmpassword from "../components/passwordReset/Confirmpassword";

interface ResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
}

const PasswordReset = () => {
  const [step, setstep] = useState(1);
  const [info, setInfo] = useState<ResetPassword>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInfo = (data: Partial<ResetPassword>) => {
    setInfo((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmailValid setstep={setstep} handleSetUserInfo={handleInfo} />;
      case 2:
        return (
          <VerificationCode
            email={info.email}
            setstep={setstep}
            handleSetUserInfo={handleInfo}
          />
        );

      case 3:
        return (
          <PasswordValid setstep={setstep} handleSetUserInfo={handleInfo} />
        );
      case 4:
        return <Confirmpassword password={info.password} />;
      default:
        return null;
    }
  };
  return <div style={{ height: "100%", padding: "20px" }}>{renderStep()}</div>;
};

export default PasswordReset;
