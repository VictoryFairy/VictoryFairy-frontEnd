import ReactGA from "react-ga4";

export const sendGaEvent = (
  category: string,
  action: string,
  label: string,
) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
