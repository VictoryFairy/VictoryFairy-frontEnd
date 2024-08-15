import styled from "styled-components";
import Heart from "@/assets/Icons/heart.svg?react";
import ArrowRight from "@/assets/Icons/arrow-right.svg?react";

const teamColors = {
  롯데: "var(--lotte-giants-navy)",
  삼성: "var(--samsung-lions-blue)",
  LG: "var(--lg-twins-red)",
  두산: "var(--doosan-bears-navy)",
  SSG: "var(--ssg-landers-red)",
  KT: "var(--kt-wiz-black)",
  한화: "var(--hanwha-eagles-orange)",
  NC: "var(--nc-dinos-blue)",
  KIA: "var(--kia-tigers-red)",
  키움: "var(--kiwoom-heroes-pink)",
};
type TeamName = keyof typeof teamColors;

interface CheerSongListProps {
  teamName: TeamName;
}
const CheerSongList = ({ teamName }: CheerSongListProps) => {
  return (
    <Container>
      <CheersInfo>
        <TeamLogo teamName={teamName}>{teamName}</TeamLogo>
        <InfoWrapper>
          <CheersName>안타송</CheersName>
          <Description>최강 롯데 승리를 위해</Description>
        </InfoWrapper>
      </CheersInfo>
      <IconWrapper>
        <Heart onClick={() => {}} cursor='pointer' />
        <ArrowRight
          fill='var(--primary-color)'
          onClick={() => {}}
          cursor='pointer'
        />
      </IconWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  border-bottom: 1px solid var(--gray-50);
`;

const CheersInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex: 1;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const TeamLogo = styled.div<{ teamName: TeamName }>`
  width: 60px;
  height: 35px;
  background-color: ${({ teamName }) => teamColors[teamName]};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: bold;
  margin-right: 12px;
`;

const CheersName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: var(--lotte-giants-navy);
`;

const Description = styled.span`
  font-size: 14px;
  color: #666666;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #999999;
  font-size: 20px;

  img {
    width: 20px;
    height: 20px;
  }
`;

export default CheerSongList;
