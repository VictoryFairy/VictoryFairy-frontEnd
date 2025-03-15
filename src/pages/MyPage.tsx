import styled from "styled-components";
import Profile from "../components/mypage/Profile";
import ProfileButtons from "../components/mypage/ProfileButtons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const MyPage = () => {
  // const [searchParams] = useSearchParams(); // ✅ 쿼리 파라미터 가져오기
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const status = searchParams.get("status");
  //   console.log(status);
  //   if (status) {
  //     switch (status) {
  //       case "SUCCESS":
  //         break;
  //       case "DUPLICATE":
  //         alert();
  //         break;
  //       case "FAIL":
  //         break;
  //       default:
  //         break;
  //     }

  //     navigate("/mypage", { replace: true });
  //   }
  // }, [searchParams, navigate]);
  return (
    <Container>
      <Profile />
      <ProfileButtons />
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
