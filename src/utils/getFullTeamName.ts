import { Team } from "@/types/Team";

export const getFullTemName = (teams: Team[]) => {
  if (!teams) return [];

  return teams.map((team) => ({
    ...team,
    name: getFullTeamNameByName(team.name),
  }));
};

const teamNameMap: { [key: string]: string } = {
  삼성: "삼성 라이온즈",
  두산: "두산 베어스",
  LG: "엘지 트윈스",
  한화: "한화 이글스",
  KIA: "기아 타이거즈",
  SSG: "SSG 랜더스",
  NC: "NC 다이노스",
  롯데: "롯데 자이언츠",
  키움: "키움 히어로즈",
  KT: "KT 위즈",
};

const getFullTeamNameByName = (name: string) => {
  return teamNameMap[name] || name;
};
