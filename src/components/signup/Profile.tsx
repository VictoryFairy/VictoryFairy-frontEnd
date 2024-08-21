import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { UserInfo } from "@/types/User";
import {
  checkNicknameAvailability,
  uploadProfileImage,
} from "@/api/auth/auth.api";
import TitleSection from "../common/TitleSection";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Icon from "../common/Icon";

interface ProfileProps {
  setstep: (step: number) => void;
  handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
}

interface ProfileFormData {
  nickname: string;
}

const Profile = ({ setstep, handleSetUserInfo }: ProfileProps) => {
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  );
  const fileInput = useRef<HTMLInputElement | null>(null);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProfileFormData>({});
  const nicknameValue = watch("nickname");

  const isButtonDisabled = !nicknameValue;

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const isExist = await checkNicknameAvailability({
        nickname: data.nickname,
      });

      if (isExist) {
        setError("nickname", {
          type: "manual",
          message: "닉네임이 이미 존재합니다.",
        });
      } else {
        handleSetUserInfo({ profilePicture: image, nickname: data.nickname });
        setstep(4);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        setError("nickname", {
          type: "manual",
          message: "이미지의 크기를 줄여주세요....",
        });
      }
    } else {
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      );
    }
  };

  return (
    <Container>
      <TitleSection title='프로필을 설정해주세요' />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <AvatarWrapper>
            <Avatar
              alt='avatar'
              src={image}
              onClick={() => fileInput.current?.click()}
            />
            <IconWrapper>
              <Icon icon='IcCamera' fill='white' />
            </IconWrapper>
          </AvatarWrapper>
          <HiddenFileInput
            type='file'
            accept='image/jpg,image/png,image/jpeg'
            onChange={onChange}
            ref={fileInput}
          />
        </InputWrapper>
        <div style={{ flex: "1" }}>
          <InputField
            name='nickname'
            label='닉네임'
            placeholder='닉네임 입력'
            register={register}
            watch={watch}
            setValue={setValue}
            error={errors.nickname}
          />
        </div>

        <ButtonWrapper>
          <Button type='submit' disabled={isButtonDisabled}>
            확인
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

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  margin-bottom: 20px;
  cursor: pointer;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const AvatarWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Profile;
