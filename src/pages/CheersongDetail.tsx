import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Icon from "../components/common/Icon";
import { fetchCheerSongDetail } from "../api/info/cheers.api";
import { typography } from "../style/typography";

const CheersongDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const newId = parseInt(id!, 10);

  const { data } = useQuery({
    queryKey: ["cheerSongDetail", id],
    queryFn: () => fetchCheerSongDetail(newId),
    enabled: !!id,
  });

  const formatLyrics = (lyrics: string) => {
    return lyrics.replace(/\n/g, "<br />");
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const videoId = data?.link ? getYouTubeVideoId(data.link) : null;

  return (
    <Container>
      <Header>
        <Icon
          icon='IcArrowLeft'
          cursor='pointer'
          onClick={() => navigate(-1)}
        />
        <HeaderSection>{data?.title}</HeaderSection>
        <HeaderSection>
          {data?.isLiked ? (
            <Icon icon='IcHeart' fill='red' />
          ) : (
            <Icon icon='IcHeart' />
          )}
        </HeaderSection>
      </Header>
      {videoId && (
        <VideoEmbed
          src={`https://www.youtube.com/embed/${videoId}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      )}
      <Lyrics
        dangerouslySetInnerHTML={{ __html: formatLyrics(data?.lyrics || "") }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px;
`;

const Header = styled.div`
  :nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${typography.headline}
  }
  height: 64px;
  position: fixed;
  top: 0;
  max-width: 440px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  z-index: 1;
`;

const HeaderSection = styled.div``;

const VideoEmbed = styled.iframe`
  width: 100%;
  height: 315px;
  border: none;
  margin-top: 20px;
`;

const Lyrics = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 16px;
`;

export default CheersongDetail;
