import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { UserInfo } from "../../types/User";
import TitleSection from "../common/TitleSection";
import InputField from "../common/InputField";
import Button from "../common/Button";

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
  const { register, watch, handleSubmit, setValue } = useForm<ProfileFormData>(
    {},
  );
  const nicknameValue = watch("nickname");

  const isButtonDisabled = !nicknameValue;

  const onSubmit = (data: ProfileFormData) => {
    handleSetUserInfo({ profilePicture: image, nickname: data.nickname });
    setstep(4);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
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
          <Avatar
            alt='avatar'
            src={image}
            onClick={() => fileInput.current?.click()}
          />
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

export default Profile;
