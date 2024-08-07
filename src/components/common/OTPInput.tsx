import React, { useRef } from "react";
import styled from "styled-components";

interface OTPInputProps {
  otp: string[];
  setOtp: (value: string[]) => void;
}
const OTPInput = ({ otp, setOtp }: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const { value } = element;

    if (Number.isNaN(Number(value)) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // 다음 입력란으로 포커스 이동
    if (value && index < otp.length - 1) {
      (inputRefs.current[index + 1] as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // 기본 Backspace 동작 방지

      if (!otp[index] && index > 0) {
        // 이전 입력란으로 포커스 이동
        inputRefs.current[index - 1]?.focus();
      } else {
        // 현재 입력란의 값 지우기
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <Container>
      {otp.map((data, index) => (
        <Input
          key={index}
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 60px;
  height: 60px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default OTPInput;
