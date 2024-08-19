import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icon from "@/components/common/Icon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLikeCheerSong, postLikeCheerSong } from "@/api/info/cheers.api";

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
  selectedTeamId?: number;
  activeTab?: number;
  type?: string;
}
const CheerSongList = ({
  id,
  teamName,
  title,
  lyricPreview,
  jerseyNumber,
  isLiked,
  selectedTeamId,
  activeTab,
  type,
}: CheerSongListProps) => {
  const navigate = useNavigate();
  const newlyricPreview = lyricPreview?.slice(0, 10);
  const handleNavigate = () => {
    const songData = {
      teamName,
      title,
      preview: lyricPreview || jerseyNumber,
    };
    const recentSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );
    const updatedSearches = [songData, ...recentSearches].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    navigate(`/cheerSongDetail/${id}`);
  };
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: postLikeCheerSong,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cheerSongs", selectedTeamId, activeTab],
      });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: deleteLikeCheerSong,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cheerSongs", selectedTeamId, activeTab],
      });
      queryClient.invalidateQueries({
        queryKey: ["likedCheerSongs", activeTab],
      });
    },
  });
  const handleAddLike = () => {
    likeMutation.mutate(id);
  };
  const handleRemoveLike = () => {
    unlikeMutation.mutate(id);
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
        {type === "search" ? (
          <Icon icon='IcCancel' />
        ) : (
          <>
            {isLiked ? (
              <Icon
                icon='IcHeart'
                fill='red'
                cursor='pointer'
                onClick={handleRemoveLike}
              />
            ) : (
              <Icon icon='IcHeart' cursor='pointer' onClick={handleAddLike} />
            )}
            <Icon
              icon='IcArrowRight'
              cursor='pointer'
              onClick={handleNavigate}
            />
          </>
        )}
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
