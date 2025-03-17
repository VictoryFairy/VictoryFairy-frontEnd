import styled from "styled-components";
import Profile from "../components/mypage/Profile";
import ProfileButtons from "../components/mypage/ProfileButtons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { usePopup } from "@/hooks/usePopup";

const MyPage = () => {
  const [searchParams] = useSearchParams();
  const { renderPopup, openPopup, closePopup } = usePopup();

  const alertMessage = () => {
    openPopup({
      title: "실패",
      message: "연동에 실패했습니다",
      buttons: [
        {
          label: "확인",
          variant: "confirm",
          onClick: closePopup,
        },
      ],
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    const status = searchParams.get("status");
    console.log(status);
    if (status) {
      switch (status) {
        case "SUCCESS":
          break;
        case "DUPLICATE":
          alertMessage();
          break;
        case "FAIL":
          alertMessage();
          break;
        default:
          break;
      }
    }
  }, [searchParams, navigate]);
  return (
    <Container>
      <Profile />
      <ProfileButtons />
      {renderPopup()}
    </Container>
  );
};

const Container = styled.div`
  height: calc(100% + 60px);
  overflow: hidden;
  max-width: 480px;
  width: calc(100% + 40px);
  margin: 0 -20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var(--gray-50);
`;

export default MyPage;
