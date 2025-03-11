import styled from "styled-components";
import Text from "../common/Text";
import Button from "../common/Button";
import { useState } from "react";

function WithDraw2() {
  const [checked, setChecked] = useState<boolean>(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Container>
      <Wrapper>
        <Text variant='headline'>
          더 나은 서비스를 위해
          <br /> 탈퇴 전 사유를 선택해 주세요.
        </Text>
        <Text variant='body_long_01' color='var(--gray-700)'>
          최소 1개 이상 선택해 주세요.
        </Text>
        <BtnWrapper>
          <InputWrapper onClick={toggleChecked}>
            <HiddenCheckbox
              type='checkbox'
              checked={checked}
              onChange={() => {}}
            />
            <StyledCheckbox checked={checked} />
            <Text variant='body_02'>기록을 삭제하고 싶어서</Text>
          </InputWrapper>
          <InputWrapper onClick={toggleChecked}>
            <HiddenCheckbox
              type='checkbox'
              checked={checked}
              onChange={() => {}}
            />
            <StyledCheckbox checked={checked} />
            <Text variant='body_02'>더 이상 야구를 좋아하지 않아서</Text>
          </InputWrapper>
          <InputWrapper onClick={toggleChecked}>
            <HiddenCheckbox
              type='checkbox'
              checked={checked}
              onChange={() => {}}
            />
            <StyledCheckbox checked={checked} />
            <Text variant='body_02'>서비스 이용이 어렵거나 불편해서</Text>
          </InputWrapper>
          <InputWrapper onClick={toggleChecked}>
            <HiddenCheckbox
              type='checkbox'
              checked={checked}
              onChange={() => {}}
            />
            <StyledCheckbox checked={checked} />
            <Text variant='body_02'>콘텐츠가 없어서</Text>
          </InputWrapper>
          <InputWrapper onClick={toggleChecked}>
            <HiddenCheckbox
              type='checkbox'
              checked={checked}
              onChange={() => {}}
            />
            <StyledCheckbox checked={checked} />
            <Text variant='body_02'>자주 사용하지 않아서</Text>
          </InputWrapper>
        </BtnWrapper>
      </Wrapper>
      <WithDrawBtn>
        <Button disabled={!checked}>
          <Text>탈퇴 하기</Text>
        </Button>
      </WithDrawBtn>
    </Container>
  );
}

export default WithDraw2;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  > :nth-child(2) {
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const WithDrawBtn = styled.div`
  position: absolute;
  bottom: -24px;
  width: 100%;
  > button {
    height: 48px;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  cursor: pointer;
  height: 58px;
  align-items: center;
  > span {
    margin-bottom: 2%.5;
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(47, 48, 54, 1);
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  position: relative;
  background-color: ${({ checked }) => (checked ? "black" : "transparent")};
  cursor: pointer;
  background-image: ${({ checked }) =>
    checked ? "url('/check.png')" : "none"};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
