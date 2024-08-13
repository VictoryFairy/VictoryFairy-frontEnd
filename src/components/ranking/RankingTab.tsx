import styled from "styled-components";
import { typography } from "../../style/typography";

const team = [
  "전체",
  "LG트윈스",
  "두산베어스",
  "SSG렌더스",
  "KT위즈",
  "한화이글스",
  "NC다이노스",
  "롯제자이언츠",
  "KIA타이거즈",
  "키움히어로즈",
  "삼성라이온즈",
];

const RankingTab = () => {
  return (
    <Container>
      <TeamTabWrapper>
        {team.map((element, index) => {
          return (
            <button type='button' key={index}>
              {element}
            </button>
          );
        })}
      </TeamTabWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  > div::-webkit-scrollbar {
    display: none;
  }
`;

const TeamTabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding-bottom: 10px;
  > button {
    flex: 0 0 auto;
    width: 100px;
    height: 32px;
    border-radius: 4px;
    padding: 8px 12px;
    gap: 7px;
    border: 1px solid var(--gray-100);
    ${typography.subtitle_01}
    margin-right: 10px;
  }
`;

export default RankingTab;
