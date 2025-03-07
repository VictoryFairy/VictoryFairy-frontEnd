import styled from "styled-components";
import Text from "../common/Text";
import { useState } from "react";

function SocialLogin() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

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
            id='toggle1'
            checked={isChecked1}
            onChange={() => setIsChecked1((prev) => !prev)}
          />
          <label htmlFor='toggle1'></label>
        </ToggleWrapper>
      </Wrapper>
      <hr />
      <Wrapper>
        <TextWrapper>
          <img src='/applelogin.png' alt='애플' />
          <Text variant='body_02' color='var(--primary-color)'>
            Apple 로그인 연동
          </Text>
        </TextWrapper>
        <ToggleWrapper>
          <input
            type='checkbox'
            id='toggle2'
            checked={isChecked2}
            onChange={() => setIsChecked2((prev) => !prev)}
          />
          <label htmlFor='toggle2'></label>
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
            id='toggle3'
            checked={isChecked3}
            onChange={() => setIsChecked3((prev) => !prev)}
          />
          <label htmlFor='toggle3'></label>
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
`;

export default SocialLogin;
