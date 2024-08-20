import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchCheerSongs, FetchLikedCheerSongs } from "@/api/info/cheers.api";
import { useAuthStore } from "@/store/authStore";
import SelectionBar from "@/components/common/SelectionBar";
import Text from "@/components/common/Text";
import { typography } from "@/style/typography";
import TeamList from "./TeamList";
import CheerSongList, { TeamName } from "./CheerSongList";
import empty from "../../../assets/images/Group 625793.png";
import search from "../../../assets/Icons/search.svg";

const CheerSongPage = () => {
  const { teamId } = useAuthStore();
  const [selectedTeamId, setSelectedTeamId] = useState(teamId);
  const [activeTab, setActiveTab] = useState(0); // 0: team, 1: player

  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   queryClient.resetQueries({
  //     queryKey: ["cheerSongs", selectedTeamId, activeTab],
  //   });
  //   queryClient.resetQueries({
  //     queryKey: ["likedCheerSongs", activeTab],
  //   });
  // }, [selectedTeamId, activeTab, queryClient]);

  const {
    data: likedCheerSongsData,
    fetchNextPage: fetchNextLikedPage,
    hasNextPage: hasNextLikedPage,
    isFetchingNextPage: isFetchingNextLikedPage,
  } = useInfiniteQuery({
    queryKey: ["likedCheerSongs", activeTab],
    queryFn: async ({ pageParam = 0 }) => {
      const type = activeTab === 0 ? "team" : "player";
      const response = await FetchLikedCheerSongs({
        pageParam,
        type,
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
  } = useInfiniteQuery({
    queryKey: ["cheerSongs", selectedTeamId, activeTab],
    queryFn: async ({ pageParam = 0 }) => {
      const type = activeTab === 0 ? "team" : "player";
      const response = await fetchCheerSongs({
        pageParam,
        teamId: selectedTeamId,
        type,
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

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (
        target.isIntersecting &&
        hasNextCheerPage &&
        !isFetchingNextCheerPage
      ) {
        fetchNextCheerPage();
      } else if (
        target.isIntersecting &&
        hasNextLikedPage &&
        !isFetchingNextLikedPage
      ) {
        fetchNextLikedPage();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [
    fetchNextCheerPage,
    hasNextCheerPage,
    isFetchingNextCheerPage,
    fetchNextLikedPage,
    hasNextLikedPage,
    isFetchingNextLikedPage,
  ]);

  return (
    <Container>
      <SearchBarWrapper onClick={() => navigate("/search-cheerSong")}>
        <SearchInput placeholder='선수명, 제목, 가사를 입력해주세요' />
        <SearchIcon src={search} />
      </SearchBarWrapper>
      <TeamList
        selectedTeamId={selectedTeamId}
        setSelectedTeamId={setSelectedTeamId}
      />
      <div className='line' />
      <div className='selectContainer'>
        <SelectionBar
          labels={["팀 응원가", "선수 응원가"]}
          activeSelect={activeTab}
          onSelectClick={setActiveTab}
          direction='row'
        />
      </div>

      {selectedTeamId === 0 && (
        <div>
          {likedCheerSongsData?.pages.length === 0 ? (
            <EmptyState>
              <img src={empty} alt='No liked cheer songs' />
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
                selectedTeamId={selectedTeamId}
                activeTab={activeTab}
                key={cheerSong.id}
                id={cheerSong.id}
                teamName={cheerSong.team.name as TeamName}
                title={cheerSong.title}
                lyricPreview={cheerSong.lyrics_preview}
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
            selectedTeamId={selectedTeamId}
            activeTab={activeTab}
            key={cheerSong.id}
            id={cheerSong.id}
            teamName={cheerSong.team.name as TeamName}
            title={cheerSong.title}
            lyricPreview={cheerSong.lyrics_preview}
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
    height: 20px;
    background-color: var(--gray-50);
  }
  .selectContainer {
    margin: 20px 0;
    padding: 0 20px;
  }
  .trigger {
    height: 70px;
    margin-bottom: 60px;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 0 20px;
  height: 35px;
  margin: 0 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  ${typography.title_01}
`;

const SearchIcon = styled.img`
  color: #888;
  cursor: pointer;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export default CheerSongPage;
