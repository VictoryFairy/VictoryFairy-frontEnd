import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import SearchBar from "../components/common/SearchBar";
import ArrowLeft from "../assets/Icons/arrow-left.svg?react";
import CheerSongList, {
  TeamName,
} from "../components/info/cheerSong/CheerSongList";
import { fetchSearchCheerSongs } from "../api/info/cheers.api";

const SearchCheerSong = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["searchCheerSongs", searchTerm],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await fetchSearchCheerSongs({
          pageParam,
          q: searchTerm,
        });
        return response;
      },
      getNextPageParam: (lastPage) => {
        return lastPage.meta.hasNextData ? lastPage.meta.cursor : undefined;
      },
      initialPageParam: 0,
      enabled: !!searchTerm,
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

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSearch = () => {};

  return (
    <Container>
      <HeaderContainer>
        <ArrowLeft
          fill='var(--primary-color)'
          onClick={() => navigate(-1)}
          cursor='pointer'
        />
        <HeaderSection>
          <SearchBar
            placeholder='선수명, 제목, 가사를 검색해주세요'
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
          />
        </HeaderSection>
      </HeaderContainer>
      <div className='list'>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page.data.map((cheerSong) => (
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
          </div>
        ))}
        {isFetchingNextPage && <div>Loading more...</div>}
        <div ref={lastElementRef} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  min-height: 100vh;
  margin: auto;
  position: relative;
  padding-top: 60px;

  .list {
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;

const HeaderContainer = styled.div`
  height: 64px;
  position: fixed;
  top: 0;
  max-width: 480px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 30px 20px;
  background-color: var(--white);
  z-index: 10;
`;

const HeaderSection = styled.div`
  flex: 1;
  margin-left: 20px;
`;

export default SearchCheerSong;
