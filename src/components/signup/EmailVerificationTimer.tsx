import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { typography } from "@/style/typography";

interface EmailVerificationTimerProps {
  onResend: () => void;
}

const EmailVerificationTimer = ({ onResend }: EmailVerificationTimerProps) => {
  const [seconds, setSeconds] = useState(180); // 3 minutes
  const [isActive, setIsActive] = useState(true);

  const startTimer = useCallback(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isActive) {
      const clearIntervalFn = startTimer();
      return clearIntervalFn;
    }
  }, [isActive, startTimer]);

  const resetTimer = () => {
    setSeconds(180);
    setIsActive(true);
    onResend();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${String(minutes).padStart(2, "0")}분 ${String(remainingSeconds).padStart(2, "0")}초`;
  };

  return (
    <TimerWrapper>
      <div>인증코드 유효시간 :</div>
      <Timer>{formatTime(seconds)}</Timer>
      <ResendButton onClick={resetTimer} disabled={isActive}>
        인증번호 재전송
      </ResendButton>
    </TimerWrapper>
  );
};

const TimerWrapper = styled.div`
  ${typography.body_02}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 25px;
`;

const Timer = styled.span``;

const ResendButton = styled.button`
  ${typography.body_02}
  background: none;
  border: none;
  cursor: pointer;
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

export default EmailVerificationTimer;
