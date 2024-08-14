import styled from "styled-components";
import Button from "../common/Button";
import CancelIcon from "../../assets/Icons/cancel.svg?react";
import CameraIcon from "../../assets/Icons/camera.svg?react";
import { usePopup } from "../../hooks/usePopup";
import Text from "../common/Text";

const ProfileChange = () => {
  const { Popup, isOpen, openPopup } = usePopup();
  const handleBtnClick = () => {
    openPopup();
  };
  return (
    <Container>
      {isOpen && (
        <Popup
          title='프로필 설정 완료'
          message='프로필 설정이 완료되었습니다.'
          type='alert'
        />
      )}
      <Form>
        <ProfileWrapper>
          <Avatar
            alt='avatar'
            src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
          />
          <CameraIconWrapper>
            <CameraIcon />
          </CameraIconWrapper>
        </ProfileWrapper>
        <InputWrapper>
          <Text variant='caption' color='var(--gray-700)'>
            닉네임
          </Text>
          <input value='홍길동' />
          <CancelIcon />
        </InputWrapper>

        <ButtonWrapper>
          <Button type='button' onClick={handleBtnClick}>
            저장
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
  > span {
    height: 16px;
  }
  > input {
    width: 100%;
    height: 40px;
    gap: 8px;
    padding: 12px 8px 8px 0;
    border: none;
    border-bottom: 1px solid var(--primary-color);
    outline: none;
  }
  > svg {
    position: absolute;
    right: 20px;
    margin-top: 12px;
    width: 20px;
    height: 20px;
    color: var(--primary-color);
    cursor: pointer;
  }
`;

const Avatar = styled.img`
  margin-bottom: 20px;
  cursor: pointer;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  margin-left: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--gray-900);
  border-radius: 39px;
  gap: 10px;
  padding: 8px;
  > svg {
    fill: var(--white);
    width: 20px;
    height: 20px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
export default ProfileChange;
