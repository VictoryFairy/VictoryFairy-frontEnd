import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import SearchBar from "../components/common/SearchBar";
import CheerSongList, {
  CheerSongListProps,
  TeamName,
} from "../components/info/cheerSong/CheerSongList";
import { fetchSearchCheerSongs } from "../api/info/cheers.api";
import Text from "../components/common/Text";
import Icon from "../components/common/Icon";

const SearchCheerSong = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const [recentSearches, setRecentSearches] = useState<CheerSongListProps[]>(
    [],
  );

  useEffect(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );
    setRecentSearches(storedSearches);
  }, []);

  const {
    data: searchSongsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
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
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.data),
    }),
  });

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);

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

  if (isError) {
    return <div>서버 에러입니다</div>;
  }
  return (
    <Container>
      <HeaderContainer>
        <Icon
          icon='IcArrowLeft'
          fill='var(--primary-color)'
          onClick={() => navigate(-1)}
          cursor='pointer'
        />
        <HeaderSection>
          <SearchBar
            placeholder='선수명,제목,가사를 검색해주세요'
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
          />
        </HeaderSection>
      </HeaderContainer>

      {searchTerm.length === 0 && (
        <>
          <h3 className='searchList'>최근 검색어</h3>
          {recentSearches.length === 0 && (
            <TextStyle as='p'>검색어가 없습니다</TextStyle>
          )}
          {recentSearches.length > 0 && (
            <div className='list'>
              {recentSearches.map((cheerSong) => (
                <CheerSongList
                  key={cheerSong.id}
                  id={cheerSong.id}
                  teamName={cheerSong.teamName as TeamName}
                  title={cheerSong.title}
                  lyricPreview={cheerSong.lyricPreview}
                  type='search'
                  setRecentSearches={setRecentSearches}
                />
              ))}
            </div>
          )}
        </>
      )}
      <div className='list'>
        {searchSongsData?.pages.map((cheerSong) => (
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
            searchTerm={searchTerm}
          />
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

  .searchList {
    margin-top: 20px;
    padding: 0 20px;
  }
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
const TextStyle = styled(Text)`
  text-align: center;
  margin-top: 30px;
`;
const HeaderSection = styled.div`
  flex: 1;
  margin-left: 20px;
`;

export default SearchCheerSong;
