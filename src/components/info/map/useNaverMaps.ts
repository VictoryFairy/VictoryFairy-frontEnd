import { useState, useEffect } from "react";

const useNaverMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.naver) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_MAP_CLIENT_ID}`;
    script.async = true;

    script.onload = () => setIsLoaded(true);
    script.onerror = () => console.error("Naver Maps API 로드 실패");

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return isLoaded;
};

export default useNaverMaps;
