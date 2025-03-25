import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const flowType = searchParams.get("flow_type");
    const pid = searchParams.get("pid");
<<<<<<< HEAD
    const flowtype = searchParams.get("flow_type");
=======
>>>>>>> 4174952d3044518f096c7d753147ca6e83a29b5b
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
