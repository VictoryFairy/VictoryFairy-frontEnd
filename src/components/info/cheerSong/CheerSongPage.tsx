import { useState } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCheerSongs, FetchLikedCheerSongs } from "@/api/info/cheers.api";
import { useAuthStore } from "@/store/authStore";
// import SelectionBar from "@/components/common/SelectionBar";
import Text from "@/components/common/Text";
import emptyWebp from "@/assets/images/cheersEmpty/empty.webp";
import emptyPng from "@/assets/images/cheersEmpty/empty.png";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import TeamList from "./TeamList";
import CheerSongList, { TeamName } from "./CheerSongList";

const CheerSongPage = () => {
  const { teamId } = useAuthStore();
  const [selectedTeamId, setSelectedTeamId] = useState(teamId);
  // const [activeTab, setActiveTab] = useState(() => {
  //   return Number(localStorage.getItem("tab")) || 0;
  // });

  // useEffect(() => {
  //   localStorage.setItem("selectedTeamId", String(selectedTeamId));
  // }, [selectedTeamId]);

  // useEffect(() => {
  //   localStorage.setItem("tab", String(activeTab));
  // }, [activeTab]);

  const {
    data: likedCheerSongsData,
    fetchNextPage: fetchNextLikedPage,
    hasNextPage: hasNextLikedPage,
    isFetchingNextPage: isFetchingNextLikedPage,
    isError: isLikedCheerSongsError,
  } = useInfiniteQuery({
    queryKey: ["likedCheerSongs"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await FetchLikedCheerSongs({
        pageParam,
        type: "team",
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextData ? lastPage.meta.cursor : undefined;
    },
    initialPageParam: 0,
    enabled: selectedTeamId === 0,
    staleTime: Infinity,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.data),
    }),
  });

  const {
    data: cheerSongsData,
    fetchNextPage: fetchNextCheerPage,
    hasNextPage: hasNextCheerPage,
    isFetchingNextPage: isFetchingNextCheerPage,
    isError: isCheerSongsError,
  } = useInfiniteQuery({
    queryKey: ["cheerSongs", selectedTeamId],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchCheerSongs({
        pageParam,
        teamId: selectedTeamId,
        type: "team",
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextData ? lastPage.meta.cursor : undefined;
    },
    initialPageParam: 0,
    enabled: selectedTeamId !== 0,
    staleTime: Infinity,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.data),
    }),
  });

  const { lastElementRef } = useIntersectionObserver((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      if (hasNextCheerPage && !isFetchingNextCheerPage) {
        fetchNextCheerPage();
      } else if (hasNextLikedPage && !isFetchingNextLikedPage) {
        fetchNextLikedPage();
      }
    }
  });

  if (isCheerSongsError || isLikedCheerSongsError) {
    throw new Error("서버문제로 인한 에러.");
  }

  return (
    <Container>
      <TeamList
        selectedTeamId={selectedTeamId}
        setSelectedTeamId={setSelectedTeamId}
      />
      <div className='line' />
      {/* <div className='selectContainer'>
        <SelectionBar
          labels={["팀 응원가", "선수 응원가"]}
          activeSelect={activeTab}
          onSelectClick={setActiveTab}
          direction='row'
        />
      </div> */}

      {selectedTeamId === 0 && (
        <div>
          {likedCheerSongsData?.pages.length === 0 ? (
            <EmptyState>
              <picture>
                <source srcSet={emptyWebp} type='image/webp' />
                <img
                  src={emptyPng}
                  alt='좋아요한 노래 없음 이미지'
                  style={{
                    width: "300px",
                  }}
                />
              </picture>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}>
                <Text variant='subtitle_03'>My응원가가 없어요</Text>
                <Text>하트를 눌러 등록해보세요</Text>
              </div>
            </EmptyState>
          ) : (
            likedCheerSongsData?.pages.map((cheerSong) => (
              <CheerSongList
                key={cheerSong.id}
                id={cheerSong.id}
                teamName={cheerSong.team.name as TeamName}
                title={cheerSong.title}
                lyricPreview={cheerSong.lyricsPreview}
                isLiked={cheerSong.isLiked}
                jerseyNumber={
                  cheerSong.player
                    ? cheerSong.player.jerseyNumber.toString()
                    : undefined
                }
              />
            ))
          )}
        </div>
      )}

      {selectedTeamId !== 0 &&
        cheerSongsData?.pages.map((cheerSong) => (
          <CheerSongList
            key={cheerSong.id}
            id={cheerSong.id}
            teamName={cheerSong.team.name as TeamName}
            title={cheerSong.title}
            lyricPreview={cheerSong.lyricsPreview}
            isLiked={cheerSong.isLiked}
            jerseyNumber={
              cheerSong.player
                ? cheerSong.player.jerseyNumber.toString()
                : undefined
            }
          />
        ))}

      <div ref={lastElementRef} className='trigger' />
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  width: calc(100% + 40px);
  margin: 0 -20px;
  display: flex;
  flex-direction: column;

  .line {
    width: 100%;
    height: 16px;
    background-color: var(--gray-50);
  }
  /* .selectContainer {
    margin: 20px 0;
    padding: 0 20px;
  } */
  .trigger {
    height: 70px;
    margin-bottom: 60px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export default CheerSongPage;
