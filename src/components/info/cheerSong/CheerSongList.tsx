import styled from "styled-components";
import heart from "../../../assets/Icons/heart.svg";

const CheerSongList = () => {
  return (
    <Container>
      <CheersInfo>
        <TeamLogo>롯데</TeamLogo>
        <InfoWrapper>
          <CheersName>안타송</CheersName>
          <Description>최강 롯데 승리를 위해</Description>
        </InfoWrapper>
      </CheersInfo>
      <IconWrapper>
        <img src={heart} />
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
  align-items: center;
  flex: 1;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TeamLogo = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--lotte-giants-red);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
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
