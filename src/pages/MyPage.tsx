import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { usePopup } from "@/hooks/usePopup";
import ProfileInfo from "@/components/mypage/ProfileInfo";
import ProfileSettings from "@/components/mypage/ProfileSettings";

const MyPage = () => {
  const [searchParams] = useSearchParams();
  const { renderPopup, openPopup, closePopup } = usePopup();
  const navigate = useNavigate();

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

  useEffect(() => {
    const status = searchParams.get("status");

    if (status) {
      switch (status) {
        case "SUCCESS":
          break;
        case "DUPLICATE":
        case "FAIL":
          alertMessage();
          break;
        default:
          break;
      }

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("status");
      navigate(`?${newSearchParams.toString()}`, { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <Container>
      <ProfileInfo />
      <ProfileSettings />
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
  padding-bottom: 65px;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default MyPage;
