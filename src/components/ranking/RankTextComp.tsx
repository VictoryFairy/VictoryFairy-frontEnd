import styled from "styled-components";
import { Rank } from "@/types/Rank";
import Text from "../common/Text";

const RankTextComp = ({
  rank,
  score,
  nickname,
  image,
}: Omit<Rank, "user_id">) => {
  return (
    <RankText>
      <RankTextLeft>
        <Text variant='title_01'>{rank}</Text>
        <img src={image} alt='#' />
        <Text variant='title_01' color='var(--gray-400)'>
          {nickname}
        </Text>
      </RankTextLeft>
      <Text variant='title_01' color='var(--gray-400)'>
        {score}
      </Text>
    </RankText>
  );
};

const RankText = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RankTextLeft = styled.div`
  img {
    width: 28px;
    height: 28px;
    border-radius: 100%;
    margin: 0 10px;
  }
`;

export default RankTextComp;
