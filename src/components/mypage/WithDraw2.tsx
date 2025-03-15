import styled from "styled-components";
import Text from "../common/Text";
import Button from "../common/Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { withdrawal } from "@/api/mypage/mypage.api";
import { useNavigate } from "react-router-dom";
import { usePopup } from "@/hooks/usePopup";
import { sendGaEvent } from "@/utils/sendGaEvent";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function WithDraw2() {
  const reasons = [
    "기록을 삭제하고 싶어서",
    "더 이상 야구를 좋아하지 않아서",
    "서비스 이용이 어렵거나 불편해서",
    "콘텐츠가 없어서",
    "자주 사용하지 않아서",
  ];

  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(reasons.length).fill(false),
  );

  const { renderPopup, openPopup } = usePopup();

  const toggleChecked = (index: number) => {
    setCheckedState((prev) =>
      prev.map((checked, i) => (i === index ? !checked : checked)),
    );
  };

  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate("/mypage");
  };
  const handleClickSave = () => {
    openPopup({
      title: "회원 탈퇴 완료",
      message: "언젠가 다시 만나요!",
      buttons: [
        {
          label: "확인",
          variant: "confirm",
          onClick: handleBtnClick,
        },
      ],
    });
  };
  const isAnyChecked = checkedState.some((checked) => checked);
  const withdraw = useMutation<void, Error>({
    mutationFn: withdrawal,
    onSuccess: () => {
      const selectedReasons = reasons.filter((_, index) => checkedState[index]);
      const reasonString =
        selectedReasons.length > 0 ? selectedReasons.join(", ") : "선택 없음";

      sendGaEvent("탈퇴 사유", "탈퇴 사유", reasonString);

      handleClickSave();

      localStorage.removeItem("userInfo");
      localStorage.removeItem("authToken");
    },
    onError: (error) => {
      console.error("탈퇴 요청 중 오류 발생:", error);
    },
  });

  const handleWithdraw = () => {
    withdraw.mutate();
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
          {reasons.map((reason, index) => (
            <InputWrapper key={index} onClick={() => toggleChecked(index)}>
              <HiddenCheckbox
                type='checkbox'
                checked={checkedState[index]}
                onChange={() => {}}
              />
              <StyledCheckbox checked={checkedState[index]} />
              <Text variant='body_02'>{reason}</Text>
            </InputWrapper>
          ))}
        </BtnWrapper>
      </Wrapper>
      <WithDrawBtn>
        <Button disabled={!isAnyChecked} onClick={handleWithdraw}>
          <Text>탈퇴 하기</Text>
        </Button>
      </WithDrawBtn>
      {renderPopup()}
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
    margin-bottom: 25px;
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
    margin-bottom: 2px;
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
