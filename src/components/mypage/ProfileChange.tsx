import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { profileChange } from "@/api/mypage/mypage.api";
import styled from "styled-components";
import {
  checkNicknameAvailability,
  uploadProfileImage,
} from "@/api/auth/auth.api";
import { usePopup } from "@/hooks/usePopup";
import { useUserStore } from "@/store/userInfo";
import { useMutation } from "@tanstack/react-query";
import Button from "../common/Button";
import Text from "../common/Text";
import Icon from "../common/Icon";

const ProfileChange = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const { renderPopup, openPopup, closePopup } = usePopup();
  const { updateNickname, updateImage } = useUserStore();
  const fileInput = useRef<HTMLInputElement | null>(null);
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const profileImgUrl = await uploadProfileImage(formData);
        setImage(profileImgUrl);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const navigate = useNavigate();
  const { profile, nickname } = useUserStore((state) => ({
    profile: state.profile,
    nickname: state.nickname,
  }));

  useEffect(() => {
    setImage(profile);
    setName(nickname ?? "");
  }, [profile, nickname]);

  const mutationProfileChange = useMutation({
    mutationFn: (data: { field: string; value: string }) =>
      profileChange(data.field, data.value),
    onSuccess: (_, variables) => {
      const { field, value } = variables;
      if (field === "nickname") {
        updateNickname(value);
      } else if (field === "image") {
        updateImage(value);
      }
    },
    onError: (error) => {
      console.error("프로필 변경 중 오류 발생:", error);
    },
  });

  const handleBtnClick = async () => {
    if (name) {
      await mutationProfileChange.mutateAsync({
        field: "nickname",
        value: name,
      });
    }
    if (image) {
      await mutationProfileChange.mutateAsync({ field: "image", value: image });
    }
    navigate("/mypage");
  };

  const nickChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClickSave = () => {
    checkNicknameAvailability({ nickname: name }).then((isExist: boolean) => {
      if (isExist) {
        openPopup({
          title: "닉네임 중복",
          message: "이미 사용중인 닉네임입니다.",
          buttons: [
            {
              label: "확인",
              variant: "confirm",
              onClick: () => {
                closePopup();
              },
            },
          ],
        });
      } else {
        openPopup({
          title: "프로필 설정 완료",
          message: "프로필 설정이 완료되었습니다.",
          buttons: [
            {
              label: "확인",
              variant: "confirm",
              onClick: handleBtnClick,
            },
          ],
        });
      }
    });
  };

  return (
    <Container>
      <Form>
        <ProfileWrapper onClick={() => fileInput.current?.click()}>
          <Avatar alt='avatar' src={image ?? "/default-avatar.png"} />
          <HiddenFileInput
            type='file'
            accept='image/jpg,image/png,image/jpeg'
            onChange={onChange}
            ref={fileInput}
          />
          <CameraIconWrapper>
            <Icon icon='IcCamera' />
          </CameraIconWrapper>
        </ProfileWrapper>
        <InputWrapper>
          <Text variant='caption' color='var(--gray-700)'>
            닉네임
          </Text>
          <input type='text' value={name} onChange={nickChange} />
          <Icon icon='IcCancel' />
        </InputWrapper>
        <ButtonWrapper>
          <Button type='button' onClick={handleClickSave}>
            저장
          </Button>
        </ButtonWrapper>
      </Form>
      {renderPopup()}
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
  cursor: pointer;
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
  margin-bottom: 30px;
`;
const HiddenFileInput = styled.input`
  display: none;
`;

export default ProfileChange;
