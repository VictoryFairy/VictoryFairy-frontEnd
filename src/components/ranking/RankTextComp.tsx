import styled from "styled-components";
import Text from "../common/Text";

const RankTextComp = () => {
  return (
    <RankText>
      <RankTextLeft>
        <span>15</span>
        <img
          src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
          alt='#'
        />
        <Text variant='title_01' color='var(--gray-400)'>
          김예지
        </Text>
      </RankTextLeft>
      <Text variant='title_01' color='var(--gray-400)'>
        00P
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
