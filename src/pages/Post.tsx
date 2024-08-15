import styled from "styled-components";
import { useForm } from "react-hook-form";
import GameListItem from "../components/common/GameListItem";
import { MyGame } from "../types/Game";
import InputField from "../components/common/InputField";
import TextAreaField from "../components/common/TextAreaField";

const DATA: MyGame = {
  id: 1,
  image:
    "https://i.pinimg.com/736x/32/d9/e4/32d9e459886530093d03cd44731a48eb.jpg",
  seat: "115블록 2열 13번",
  review: "좋았다",
  status: "WIN",
  game: {
    id: "20240801SSLG0",
    date: "2024-08-01",
    time: "18:30:00",
    status: "경기 종료",
    homeTeam: {
      id: 7,
      name: "LG",
    },
    awayTeam: {
      id: 4,
      name: "삼성",
    },
    stadium: {
      id: 1,
      name: "잠실",
      latitude: 0,
      longitude: 0,
      address: "no address",
    },
    homeTeamScore: 0,
    awayTeamScore: 7,
    winningTeam: {
      id: 4,
      name: "삼성",
    },
  },
  cheeringTeam: {
    id: 4,
    name: "삼성",
  },
};
// TODO: 토글버튼으로 수정하기/삭제하기
const Post = () => {
  // UI만 잡고 직관 등록 후 작업 예정
  const { register, watch, setValue } = useForm({
    mode: "onChange",
  });
  return (
    <>
      <GameListItem data={DATA} />
      <PostContainer>
        <div className='img'>
          <img src={DATA.image} alt='post' />
        </div>
        <InputField
          name='text'
          label='응원팀'
          type='text'
          value={DATA.cheeringTeam.name}
          register={register}
          watch={watch}
          setValue={setValue}
          disabled
        />
        <InputField
          name='text'
          label='좌석'
          type='text'
          value={DATA.seat}
          register={register}
          watch={watch}
          setValue={setValue}
          disabled
        />
        <TextAreaField
          name='text'
          label='메모'
          value={DATA.review}
          register={register}
          watch={watch}
          setValue={setValue}
          disabled
        />
      </PostContainer>
    </>
  );
};
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 20px;
  gap: 20px;
  background: #ffffff;

  .img {
    width: 100%;
    height: 180px;
    img {
      width: 100%;
      height: 100%;
      flex: 1;
      object-fit: cover;
      border-radius: 12px;
    }
  }
`;

export default Post;
