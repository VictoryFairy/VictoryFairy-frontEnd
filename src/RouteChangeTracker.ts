import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_GA_ID) {
      ReactGA.initialize(import.meta.env.VITE_GA_ID, {
        // gaOptions: {
        //   debug_mode: true,
        // },
      });
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      // 현재 경로를 pagePath로 저장
      let pagePath = location.pathname;

      // "/detail/id" 패턴을 "/detail"로 변환
      if (/^\/detail\/\d+$/.test(pagePath)) {
        pagePath = "/detail"; // 모든 detail/id를 detail로 통합
      }
      if (/^\/cheerSongDetail\/\d+$/.test(pagePath)) {
        pagePath = "/cheerSongDetail"; // 모든 detail/id를 detail로 통합
      }

      // GA4에 수정된 경로로 페이지뷰 이벤트 전송
      ReactGA.send({ hitType: "pageview", page: pagePath });
    }
  }, [initialized, location]);
};

export default RouteChangeTracker;
