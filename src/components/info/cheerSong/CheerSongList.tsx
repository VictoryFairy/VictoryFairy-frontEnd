import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icon from "@/components/common/Icon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLikeCheerSong, postLikeCheerSong } from "@/api/info/cheers.api";

const teamColors = {
  "롯데 자이언츠": "var(--lotte-giants-navy)",
  "삼성 라이온즈": "var(--samsung-lions-blue)",
  "LG 트윈스": "var(--lg-twins-red)",
  "두산 베어스": "var(--doosan-bears-navy)",
  "SSG 랜더스": "var(--ssg-landers-red)",
  "KT 위즈": "var(--kt-wiz-black)",
  "한화 이글스": "var(--hanwha-eagles-orange)",
  "NC 다이노스": "var(--nc-dinos-blue)",
  "KIA 타이거즈": "var(--kia-tigers-red)",
  "키움 히어로즈": "var(--kiwoom-heroes-pink)",
};
export type TeamName = keyof typeof teamColors;

export interface CheerSongListProps {
  id: number;
  teamName: TeamName;
  title: string;
  lyricPreview?: string;
  jerseyNumber?: string;
  isLiked?: boolean;
  // selectedTeamId?: number;
  // activeTab?: number;
  type?: string;
  searchTerm?: string;
  setRecentSearches?: (data: CheerSongListProps[]) => void;
}
const CheerSongList = ({
  id,
  teamName,
  title,
  lyricPreview,
  jerseyNumber,
  isLiked,
  // selectedTeamId,
  // activeTab,
  type,
  searchTerm,
  setRecentSearches,
}: CheerSongListProps) => {
  const navigate = useNavigate();
  const newlyricPreview = lyricPreview?.slice(0, 10);
  const handleNavigate = () => {
    const songData = {
      id,
      teamName,
      title,
      lyricPreview: lyricPreview || jerseyNumber,
    };

    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    ) as CheerSongListProps[];

    const updatedSearches = storedSearches.filter((search) => search.id !== id);

    updatedSearches.unshift(songData);

    const limitedSearches = updatedSearches.slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));

    navigate(`/cheerSongDetail/${id}`);
  };

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: postLikeCheerSong,
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["cheerSongs", getTeamId(teamName), activeTab],
      // });
      queryClient.invalidateQueries({ queryKey: ["cheerSongs"], exact: false });

      // queryClient.invalidateQueries({
      //   queryKey: ["likedCheerSongs", activeTab],
      // });
      queryClient.invalidateQueries({
        queryKey: ["likedCheerSongs"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["searchCheerSongs", searchTerm],
      });
    },
    onError: () => {
      alert("좋아요 실패했습니다");
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: deleteLikeCheerSong,
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["cheerSongs", getTeamId(teamName), activeTab],
      // });
      queryClient.invalidateQueries({ queryKey: ["cheerSongs"], exact: false });

      // queryClient.invalidateQueries({
      //   queryKey: ["likedCheerSongs", activeTab],
      // });
      queryClient.invalidateQueries({
        queryKey: ["likedCheerSongs"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["searchCheerSongs", searchTerm],
      });
    },
    onError: () => {
      alert("좋아요 취소에 실패했습니다");
    },
  });
  const handleAddLike = () => {
    likeMutation.mutate(id);
  };
  const handleRemoveLike = () => {
    unlikeMutation.mutate(id);
  };
  const handleDeleteSearch = () => {
    if (setRecentSearches) {
      const recentSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]",
      ) as CheerSongListProps[];

      const updatedSearches = recentSearches.filter(
        (search) => search.id !== id,
      );

      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      setRecentSearches(updatedSearches);
    }
  };
  console.log(teamName);
  return (
    <Container>
      <CheersInfo>
        <TeamLogo teamname={teamName}>{teamName.split(" ")[0]}</TeamLogo>
        <InfoWrapper>
          <CheersName onClick={handleNavigate}>{title}</CheersName>
          <Description>
            {jerseyNumber ? `no . ${jerseyNumber}` : newlyricPreview}
          </Description>
        </InfoWrapper>
      </CheersInfo>
      <IconWrapper>
        {type === "search" ? (
          <Icon icon='IcCancel' onClick={handleDeleteSearch} cursor='pointer' />
        ) : (
          <>
            {isLiked ? (
              <Icon
                icon='IcHeartFill'
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
  gap: 3px;
  align-items: flex-start;
`;

const TeamLogo = styled.div<{ teamname: TeamName }>`
  width: 60px;
  height: 35px;
  background-color: ${({ teamname }) => teamColors[teamname]};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 12px;
  font-weight: medium;
  margin-right: 12px;
`;

const CheersName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: var(--lotte-giants-navy);
  cursor: pointer;
`;

const Description = styled.span`
  font-size: 14px;
  color: #898c9b;
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
