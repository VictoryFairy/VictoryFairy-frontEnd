import styled from "styled-components";
import Text from "../../common/Text";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userInfo";
import { socialDelete, socialLink } from "@/api/mypage/mypage.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { usePopup } from "@/hooks/usePopup";
const BASE_URL = import.meta.env.VITE_API_URL;

function SocialLogin() {
  const { provider, primaryProvider } = useUserStore();
  const navigate = useNavigate();
  const clickNav = () => {
    navigate("/mypage");
  };
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const { renderPopup, openPopup, closePopup } = usePopup();

  const linkMutation = useMutation({
    mutationFn: async ({
      provider,
      pid,
    }: {
      provider: string;
      pid: string;
    }) => {
      return await socialLink(provider, pid);
    },
    onSuccess: (_, { provider }) => {
      openPopup({
        title: "연동 성공",
        message: `${provider} 계정이 성공적으로 연동되었습니다.`,
        buttons: [
          {
            label: "확인",
            variant: "confirm",
            onClick: clickNav,
          },
        ],
      });
    },
    onError: (error, { provider }) => {
      console.error(error);
      openPopup({
        title: "연동 실패",
        message: `${provider} 계정 연동에 실패했습니다.`,
        buttons: [
          {
            label: "확인",
            variant: "confirm",
            onClick: closePopup,
          },
        ],
      });
    },
  });

  useEffect(() => {
    const handledProviders = new Set<string>();

    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.origin) return;
      const { type, payload } = event.data || {};
      if (type !== "SOCIAL_LOGIN_RESULT") return;

      const { pid, provider } = payload;

      if (!provider || !pid) return;
      if (handledProviders.has(provider)) return;

      handledProviders.add(provider);

      if (!linkMutation.isPending) {
        linkMutation.mutate({ provider, pid });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const deleteMutation = useMutation({
    mutationFn: async (provider: string) => {
      return await socialDelete(provider);
    },
    onSuccess: (_, provider) => {
      openPopup({
        title: "연동 해제 완료",
        message: `${provider} 연동이 해제되었습니다.`,
        buttons: [
          {
            label: "확인",
            variant: "confirm",
            onClick: clickNav,
          },
        ],
      });
    },
    onError: (error) => {
      console.log(error);
      openPopup({
        title: "연동 해제 실패",
        message: `${provider} 연동에 해제에 실패했습니다.`,
        buttons: [
          {
            label: "확인",
            variant: "confirm",
            onClick: closePopup,
          },
        ],
      });
    },
  });

  const socialLinkClick = async (value: string) => {
    if (value === "kakao") {
      if (isChecked1) {
        deleteMutation.mutate("kakao");
      } else {
        window.open(`${BASE_URL}/auth/link/${value}`);
      }
      setIsChecked1((prev) => !prev);
    } else if (value === "apple") {
      if (isChecked2) {
        deleteMutation.mutate("apple");
      } else {
        window.open(`${BASE_URL}/auth/link/${value}`);
      }
      setIsChecked2((prev) => !prev);
    } else if (value === "google") {
      if (isChecked3) {
        deleteMutation.mutate("google");
      } else {
        window.open(`${BASE_URL}/auth/link/${value}`);
      }
      setIsChecked3((prev) => !prev);
    }
  };

  useEffect(() => {
    setIsChecked1(provider?.includes("kakao") ?? false);
    setIsChecked2(provider?.includes("apple") ?? false);
    setIsChecked3(provider?.includes("google") ?? false);
  }, [provider, isChecked1, isChecked2, isChecked3]);

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
            onChange={() => socialLinkClick("kakao")}
            disabled={primaryProvider === "kakao"}
          />
          <label htmlFor='kakao'></label>
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
            onChange={() => socialLinkClick("apple")}
            disabled={primaryProvider === "apple"}
          />
          <label htmlFor='apple'></label>
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
            onChange={() => socialLinkClick("google")}
            disabled={primaryProvider === "google"}
          />
          <label htmlFor='google'></label>
        </ToggleWrapper>
      </Wrapper>
      {renderPopup()}
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
