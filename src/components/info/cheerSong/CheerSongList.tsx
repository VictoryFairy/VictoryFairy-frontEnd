import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Icon from "../../common/Icon";

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
export type TeamName = keyof typeof teamColors;

interface CheerSongListProps {
  id: number;
  teamName: TeamName;
  title: string;
  lyricPreview?: string;
  jerseyNumber?: string;
  isLiked: boolean;
}
const CheerSongList = ({
  id,
  teamName,
  title,
  lyricPreview,
  jerseyNumber,
  isLiked,
}: CheerSongListProps) => {
  const navigate = useNavigate();
  const newlyricPreview = lyricPreview?.slice(0, 10);
  const handleNavigate = () => {
    navigate(`/cheerSongDetail/${id}`);
  };
  return (
    <Container>
      <CheersInfo>
        <TeamLogo teamName={teamName}>{teamName}</TeamLogo>
        <InfoWrapper>
          <CheersName>{title}</CheersName>
          <Description>
            {jerseyNumber ? `no . ${jerseyNumber}` : newlyricPreview}
          </Description>
        </InfoWrapper>
      </CheersInfo>
      <IconWrapper>
        {isLiked ? (
          <Icon icon='IcHeart' fill='red' cursor='pointer' />
        ) : (
          <Icon icon='IcHeart' cursor='pointer' />
        )}
        <Icon icon='IcArrowRight' cursor='pointer' onClick={handleNavigate} />
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
