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

const themes: { [key: string]: Theme } = {
  LG: lgTwins,
  두산: doosanBears,
  SSG: ssgLanders,
  KT: ktWiz,
  한화: hanwhaEagles,
  NC: ncDinos,
  롯데: lotteGiants,
  KIA: kiaTigers,
  키움: kiwoomHeroes,
  삼성: samsungLions,
};

export const getTheme = (team: string) => {
  return themes[team] || defaultTheme;
};
