import { useEffect, useState } from "react";
import { usePopup } from "@/hooks/usePopup";
import { useNavigate } from "react-router-dom";
import EmailValid from "../components/signup/EmailValid";
import VerificationCode from "../components/signup/VerificationCode";
import PasswordValid from "../components/signup/PasswordValid";

type UserInfo = {
  email: string;
  password: string;
};
const ChangePassword = () => {
  const [step, setstep] = useState(1);
  const navigate = useNavigate();
  const { renderPopup, openPopup, closePopup } = usePopup();

  useEffect(() => {
    alertMessage();
  }, []);
  const alertMessage = () => {
    openPopup({
      title: "비밀번호 변경 실패",
      message: `소셜로그인 계정은 비밀번호 변경이 불가능합니다.`,
      buttons: [
        {
          label: "확인",
          variant: "confirm",
          onClick: () => {
            closePopup();
            navigate("/mypage");
          },
        },
      ],
    });
  };

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
          <EmailValid setstep={setstep} handleSetUserInfo={handleSetUserInfo} />
        );
      case 2:
        return <VerificationCode email={userInfo.email} setstep={setstep} />;

      case 3:
        return (
          <PasswordValid
            setstep={setstep}
            handleSetUserInfo={handleSetUserInfo}
          />
        );

      default:
        return null;
    }
  };
  return (
    <div style={{ height: "100%", paddingTop: "30px" }}>
      {renderPopup()}
      {renderStep()}
    </div>
  );
};

export default ChangePassword;
