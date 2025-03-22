import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const pid = searchParams.get("pid");
    const flowtype = searchParams.get("flowtype");
    const provider = searchParams.get("provider");
    console.log("쿼리 파라미터 확인", pid, flowtype, provider);

    if (pid && flowtype && window.opener) {
      window.opener.postMessage(
        {
          type: "SOCIAL_LOGIN_RESULT",
          payload: {
            pid,
            flowtype,
            provider,
          },
        },
        window.origin,
      );
      window.close();
    }
  }, [searchParams]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthCallback;
