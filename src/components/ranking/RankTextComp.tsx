import styled from "styled-components";
import { Rank } from "@/types/Rank";
import Text from "../common/Text";

interface RankComp extends Rank {
  isSelected?: boolean;
  onClick?: () => void;
}

const RankTextComp = ({
  rank,
  score,
  nickname,
  image,
  isSelected,
  onClick,
}: Omit<RankComp, "user_id">) => {
  return (
    <RankText onClick={onClick} isSelected={isSelected!}>
      <RankTextLeft>
        <Text variant='title_01' color='var(--gray-400)'>
          {rank}
        </Text>
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

const RankText = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.isSelected ? "rgb(245,245,245,1)" : "var(--white)"};
  > :nth-child(1) > span,
  span {
    color: ${(props) =>
      props.isSelected ? "var(--black)" : "var(--gray-400)"};
  }
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
