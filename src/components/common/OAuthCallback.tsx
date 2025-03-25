import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const flowType = searchParams.get("flow_type");
    const pid = searchParams.get("pid");
    const provider = searchParams.get("provider");

    if (window.opener) {
      window.opener.postMessage(
        {
          type: "SOCIAL_LOGIN_RESULT",
          payload: {
            status,
            flowType,
            pid,
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
