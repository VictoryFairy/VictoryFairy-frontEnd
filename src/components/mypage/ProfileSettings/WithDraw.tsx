import styled from "styled-components";
import Text from "../../common/Text";
import Button from "../../common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WithDraw() {
  const [checked, setChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Container>
      <Wrapper>
        <img src='/victory-fairy.png' alt='승리요정' />
        <Text variant='headline'>
          승리요정을 떠나시나요?
          <br /> 탈퇴 전 아래 사항을 확인해주세요.
        </Text>
        <Text variant='body_long_01' color='var(--gray-700)'>
          탈퇴 하시면 이용 중인 승리요정 계정은 폐쇠되며, <br />
          작성하신 글, 사진, 프로필 등 모든 정보가 삭제됩니다. <br />
          또한 모든 데이터는 복구가 불가능합니다.
          <br />
        </Text>
      </Wrapper>
      <BtnWrapper>
        <InputWrapper onClick={toggleChecked}>
          <HiddenCheckbox
            type='checkbox'
            checked={checked}
            onChange={() => {}}
          />
          <StyledCheckbox checked={checked} />
          <Text variant='body_01'>
            안내 사항을 모두 확인하였으며, 이에 동의합니다.
          </Text>
        </InputWrapper>
        <Button
          disabled={!checked}
          onClick={() => navigate("/mypage/withDraw2")}>
          <Text>탈퇴 이유 입력하기</Text>
        </Button>
      </BtnWrapper>
    </Container>
  );
}

export default WithDraw;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 20px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  min-width: 354px;
  max-height: 354px;
  margin-top: 20px;
  > img {
    width: 200px;
    height: 200px;
  }
  > span {
    text-align: center;
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  bottom: -24px;
  width: 100%;
  > button {
    height: 48px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  cursor: pointer;
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
