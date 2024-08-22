import styled from "styled-components";
import { MyInfo } from "@/api/rank/rank.api";
import { Rank } from "@/types/Rank";
import Icon from "../common/Icon";
import Text from "../common/Text";
import Button from "../common/Button";

interface MyRankCompType extends MyInfo {
  withUser: Rank | null;
}

const MyRankComp = ({ totalGames, win, withUser }: MyRankCompType) => {
  return (
    <>
      <MyRank>
        <RankTextLeft>
          <span>{withUser?.rank}</span>
          <img src={withUser?.image} alt='#' />
          <Text variant='title_01'>{withUser?.nickname}</Text>
        </RankTextLeft>
        <RankTextRight>
          <Text variant='title_01' color='var(--primary-color)'>
            {withUser?.score}P
          </Text>
          <Button>
            <Text variant='subtitle_01' color='var(--white)'>
              UP
            </Text>
            <Text variant='subtitle_01' color='var(--white)'>
              <Icon
                icon='IcArrowUp'
                fill='var(--white)'
                style={{ width: "12px", height: "12px", marginLeft: "3px" }}
              />
            </Text>
          </Button>
        </RankTextRight>
      </MyRank>
      <MyRanks>
        <Text variant='subtitle_01' color='var(--gray-900)'>
          나의 승률
        </Text>
        <Text variant='caption' color='var(--gray-900)'>
          {Number.isNaN((win / totalGames) * 100)
            ? "데이터 없음"
            : `${((win / totalGames) * 100).toFixed(2)}%`}
        </Text>
      </MyRanks>
      <MyRanks>
        <Text variant='subtitle_01' color='var(--gray-900)'>
          직관 경기 누적수
        </Text>
        <Text variant='caption' color='var(--gray-900)'>
          {totalGames}
        </Text>
      </MyRanks>
    </>
  );
};

const MyRank = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--gray-100);
  padding: 15px 0;
`;
const RankTextLeft = styled.div`
  img {
    width: 28px;
    height: 28px;
    border-radius: 100%;
    margin: 0 10px;
  }
`;

const RankTextRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    width: 54px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
  }
`;

const MyRanks = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 16px;
  margin-top: 15px;
`;
export default MyRankComp;
