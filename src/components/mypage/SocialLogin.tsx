import styled from "styled-components";
import Text from "../common/Text";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userInfo";

function SocialLogin() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { provider } = useUserStore();

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  // const socialLinkClick = async (value: string) => {
  //   if (
  //     (value === "kakao" && isChecked1) ||
  //     (value === "apple" && isChecked2) ||
  //     (value === "google" && isChecked3)
  //   ) {
  //     return;
  //   }

  //   const targetUrl = `${BASE_URL}/auth/link/${value}`;

  //   try {
  //     // ✅ GET 요청으로 먼저 상태 확인 (HEAD 대신)
  //     const response = await fetch(targetUrl, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     console.log(response);

  //     if (!response.ok) {
  //       if (response.status === 401) {
  //         alert("로그인이 필요합니다.");
  //         return;
  //       } else if (response.status === 500) {
  //         alert("서버 오류 발생. 다시 시도해주세요.");
  //         return;
  //       }
  //     }

  //     // ✅ 정상 응답이면 페이지 이동
  //     window.location.href = targetUrl;
  //   } catch (error) {
  //     console.error("Authentication link failed:", error);
  //     alert(
  //       "현재 해당 서비스에 로그인할 수 없습니다. 이전 페이지로 돌아갑니다.",
  //     );
  //   }
  // };

  const socialLinkClick = (value: string) => {
    if (
      (value === "kakao" && isChecked1) ||
      (value === "apple" && isChecked2) ||
      (value === "google" && isChecked3)
    ) {
      return;
    }
    // window.location.href = `${BASE_URL}/auth/link/${value}`;
    window.open(`${BASE_URL}/auth/link/${value}`);
  };

  useEffect(() => {
    setIsChecked1(provider?.includes("kakao") ?? false);
    setIsChecked2(provider?.includes("apple") ?? false);
    setIsChecked3(provider?.includes("google") ?? false);
  }, [provider]);

  return (
    <Container>
      <Wrapper>
        <TextWrapper>
          <img src='/kakaoBallon.png' alt='카카오' />
          <Text variant='body_02' color='var(--primary-color)'>
            카카오 로그인 연동
          </Text>
        </TextWrapper>
        <ToggleWrapper>
          <input
            type='checkbox'
            id='kakao'
            checked={isChecked1}
            onClick={() => socialLinkClick("kakao")}
            readOnly
          />
          <label
            htmlFor='kakao'
            className={isChecked1 ? "disabled" : ""}></label>
        </ToggleWrapper>
      </Wrapper>
      <hr />
      <Wrapper>
        <TextWrapper>
          <img src='/applelogin.png' alt='apple' />
          <Text variant='body_02' color='var(--primary-color)'>
            Apple 로그인 연동
          </Text>
        </TextWrapper>
        <ToggleWrapper>
          <input
            type='checkbox'
            id='apple'
            checked={isChecked2}
            onClick={() => socialLinkClick("apple")}
            readOnly
          />
          <label
            htmlFor='apple'
            className={isChecked2 ? "disabled" : ""}></label>
        </ToggleWrapper>
      </Wrapper>
      <hr />
      <Wrapper>
        <TextWrapper>
          <img src='/googlelogin.png' alt='구글' />
          <Text variant='body_02' color='var(--primary-color)'>
            구글 로그인 연동
          </Text>
        </TextWrapper>
        <ToggleWrapper>
          <input
            type='checkbox'
            id='google'
            checked={isChecked3}
            onClick={() => socialLinkClick("google")}
            readOnly
          />
          <label
            htmlFor='google'
            className={isChecked3 ? "disabled" : ""}></label>
        </ToggleWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 208px;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  > hr {
    width: 100%;
    height: 1px;
    background-color: var(--gray-100);
    border: none;
    margin: 0;
  }
`;

const Wrapper = styled.div`
  padding: 8px 0;
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  > img {
    width: 20px;
    height: 20px;
    gap: 10px;
    margin-right: 10px;
  }
`;

const ToggleWrapper = styled.div`
  > input {
    display: none;
  }
  > label {
    position: relative;
    display: block;
    width: 52px;
    height: 32px;
    background-color: #ccc;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  > label::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 28px;
    height: 28px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  > input:checked + label {
    background-color: rgba(47, 48, 54, 1);
  }

  > input:checked + label::before {
    transform: translateX(20px);
  }

  > label.disabled {
    pointer-events: none;
    opacity: 1;
  }

  > input:checked + label.disabled {
    background-color: rgba(47, 48, 54, 1);
  }

  > input:checked + label.disabled::before {
    transform: translateX(20px);
  }
`;

export default SocialLogin;
