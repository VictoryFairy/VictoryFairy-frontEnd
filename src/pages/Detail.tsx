import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getRegisteredGameById } from "@/api/register/register";
// import GameListItem from "../components/common/GameListItem";
import InputField from "../components/common/InputField";
import TextAreaField from "../components/common/TextAreaField";

// TODO: 토글버튼으로 수정하기/삭제하기
const Detail = () => {
  const location = useLocation();
  const id = +location.pathname.split("/")[2];

  const { data } = useQuery({
    queryKey: ["registeredGame", id],
    queryFn: () => getRegisteredGameById(id),
  });
  console.log(data);

  // UI만 잡고 직관 등록 후 작업 예정
  const { register, watch, setValue } = useForm({
    mode: "onChange",
  });

  // TODO:이거도 리팩토링 해야함
  if (!data) return null;

  return (
    <>
      {/* <GameListItem data={DATA} /> */}
      <DetailContainer>
        <div className='img'>
          <img src={data?.image} alt='img' />
        </div>
        <InputField
          name='text'
          label='응원팀'
          type='text'
          value={data?.cheeringTeam.name}
          register={register}
          watch={watch}
          setValue={setValue}
          disabled
        />
        <InputField
          name='text'
          label='좌석'
          type='text'
          value={data?.seat}
          register={register}
          watch={watch}
          setValue={setValue}
          disabled
        />
        <TextAreaField
          name='text'
          label='메모'
          value={data?.review}
          register={register}
          watch={watch}
          setValue={setValue}
          disabled
        />
      </DetailContainer>
    </>
  );
};
const DetailContainer = styled.div`
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

export default Detail;
