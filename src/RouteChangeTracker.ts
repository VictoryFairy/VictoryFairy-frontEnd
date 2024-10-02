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
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }
  }, [initialized, location]);
};

export default RouteChangeTracker;
