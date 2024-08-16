import styled from "styled-components";
import Text from "../common/Text";
import Button from "../common/Button";

const MyRankComp = () => {
  return (
    <>
      <MyRank>
        <RankTextLeft>
          <span>15</span>
          <img
            src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
            alt='#'
          />
          <Text variant='title_01'>김예지</Text>
        </RankTextLeft>
        <RankTextRight>
          <Text variant='title_01' color='var(--primary-color)'>
            00P
          </Text>
          <Button>
            <Text variant='subtitle_01' color='var(--white)'>
              up^
            </Text>
          </Button>
        </RankTextRight>
      </MyRank>
      <MyRanks>
        <Text variant='subtitle_01' color='var(--gray-900)'>
          나의 승률
        </Text>
        <Text variant='caption' color='var(--gray-900)'>
          00%
        </Text>
      </MyRanks>
      <MyRanks>
        <Text variant='subtitle_01' color='var(--gray-900)'>
          직관 경기 누적수
        </Text>
        <Text variant='caption' color='var(--gray-900)'>
          5회
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
