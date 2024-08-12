interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
}

const defaultTheme: Theme = {
  colors: {
    primary: "#2F3036",
    secondary: "",
  },
};

const lgTwins: Theme = {
  colors: {
    primary: "#C40037",
    secondary: "#000000",
  },
};

const doosanBears: Theme = {
  colors: {
    primary: "#131230",
    secondary: "#C40037",
  },
};

const ssgLanders: Theme = {
  colors: {
    primary: "#BE262C",
    secondary: "#FFD86C",
  },
};

const ktWiz: Theme = {
  colors: {
    primary: "#000000",
    secondary: "#EF1925",
  },
};

const hanwhaEagles: Theme = {
  colors: {
    primary: "#FF6600",
    secondary: "#25282A",
  },
};

const ncDinos: Theme = {
  colors: {
    primary: "#1D467D",
    secondary: "#BEA079",
  },
};

const lotteGiants: Theme = {
  colors: {
    primary: "#041E42",
    secondary: "#D00F31",
  },
};

const kiaTigers: Theme = {
  colors: {
    primary: "#EC0029",
    secondary: "#05141F",
  },
};

const kiwoomHeroes: Theme = {
  colors: {
    primary: "#620015",
    secondary: "#D1187D",
  },
};

const samsungLions: Theme = {
  colors: {
    primary: "#0059A6",
    secondary: "#AEAEAF",
  },
};

export const getTheme = (team: string) => {
  switch (team) {
    case "LG트윈스":
      return lgTwins;
    case "두산베어스":
      return doosanBears;
    case "SSG랜더스":
      return ssgLanders;
    case "KT위즈":
      return ktWiz;
    case "한화이글스":
      return hanwhaEagles;
    case "NC다이노스":
      return ncDinos;
    case "롯데자이언츠":
      return lotteGiants;
    case "KIA타이거즈":
      return kiaTigers;
    case "키움히어로즈":
      return kiwoomHeroes;
    case "삼성라이온즈":
      return samsungLions;
    default:
      return defaultTheme;
  }
};
