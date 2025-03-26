import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const status = searchParams.get("status");
    const flowType = searchParams.get("flow_type");
    const pid = searchParams.get("pid");
    const provider = searchParams.get("provider");

    if (window.opener) {
      window.opener.postMessage(
        {
          type: "SOCIAL_LOGIN_RESULT",
          payload: {
            status,
            flowType,
            pid,
            provider,
          },
        },
        window.origin,
      );

      // 메시지 전송 완료 상태 업데이트
      setMessageSent(true);

      // iOS에서는 window.close()가 작동하지 않으므로 시도하되 의존하지 않음
      try {
        window.close();
      } catch (e) {
        console.log("창 닫기 실패", e);
      }
    }
  }, [searchParams]);

  return (
    <Container>
      {messageSent ? (
        <>
          <Title>로그인 처리가 완료되었습니다</Title>
          <Message>이 창은 닫으셔도 됩니다</Message>
          <CloseButton
            onClick={() => {
              try {
                window.close();
              } catch (e) {
                console.log("창 닫기 실패", e);
              }
            }}>
            창 닫기
          </CloseButton>
        </>
      ) : (
        <LoadingMessage>로그인 처리 중...</LoadingMessage>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`;

const LoadingMessage = styled.p`
  font-size: 16px;
`;

const CloseButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;

export default OAuthCallback;
