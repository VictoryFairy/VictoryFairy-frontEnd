import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import TeamList from "./TeamList";
import search from "../../../assets/Icons/search.svg";
import { typography } from "../../../style/typography";
import SelectionBar from "../../common/SelectionBar";
import CheerSongList, { TeamName } from "./CheerSongList";
import { fetchCheerSongs } from "../../../api/info/cheers.api";

const CheerSongPage = () => {
  const { teamId } = useAuthStore();
  const [selectedTeamId, setSelectedTeamId] = useState(teamId);
  const [activeTab, setActiveTab] = useState(0); // 0 team, 1 player

  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.resetQueries({
      queryKey: ["cheerSongs", selectedTeamId, activeTab],
    });
  }, [selectedTeamId, activeTab, queryClient]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
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
      select: (data2) => ({
        pages: data2.pages.flatMap((page) => page.data),
      }),
    });

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "100px",
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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

      {data?.pages.map((cheerSong) => (
        <CheerSongList
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

export default CheerSongPage;
