import { Helmet } from "react-helmet-async";

interface DetailHelmetProps {
  title: string;
  eventDetail: string;
  pageTitle: string;
  url: string;
}

export const DetailHelmet = ({
  title,
  eventDetail,
  pageTitle,
  url,
}: DetailHelmetProps) => {
  return (
    <Helmet>
      {/* 페이지 제목 */}
      {title && eventDetail && <title>승리요정 | {pageTitle}</title>}

      {/* Open Graph (Facebook, 카카오톡 등) */}
      <meta property='og:title' content={pageTitle} />
      <meta property='og:url' content={url} />
      <meta property='og:description' content={eventDetail} />
      <meta property='og:image' content='/logo.png' />
      <meta property='og:image:alt' content='승리요정 이벤트 이미지' />

      {/* Twitter */}
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:url' content={url} />
      <meta name='twitter:description' content={eventDetail} />
      <meta name='twitter:image' content='/logo.png' />
      <meta name='twitter:image:alt' content='승리요정 이벤트 이미지' />

      {/* 일반 메타 태그 */}
      <meta name='description' content={eventDetail} />
      <meta name='keywords' content={`승리요정, 야구, 직관기록 ${title}`} />

      {/* 구조화된 데이터 (JSON-LD) */}
      <script type='application/ld+json'>
        {`{
          "@context": "https://schema.org",
          "name": "${pageTitle}",
          "description": "${eventDetail}",
          "url": "${url}",
          "image": "${"/logo.png"}"
        }`}
      </script>
    </Helmet>
  );
};
