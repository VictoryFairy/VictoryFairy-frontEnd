import { useState } from "react";
import EmailValid from "../components/passwordReset/EmailValid";
import VerificationCode from "../components/passwordReset/VerificationCode";
import PasswordValid from "../components/passwordReset/PassWordReset";
import Confirmpassword from "../components/passwordReset/Confirmpassword";
import { useSignupStore } from "../store/signupStep";

interface ResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
}

const PasswordReset = () => {
  // const [step, setstep] = useState(1);
  const { step, setstep } = useSignupStore();
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
        return <VerificationCode email={info.email} setstep={setstep} />;

      case 3:
        return (
          <PasswordValid setstep={setstep} handleSetUserInfo={handleInfo} />
        );
      case 4:
        return (
          <Confirmpassword
            setstep={setstep}
            password={info.password}
            email={info.email}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div style={{ height: "100%", paddingTop: "30px" }}>{renderStep()}</div>
  );
};

export default PasswordReset;
