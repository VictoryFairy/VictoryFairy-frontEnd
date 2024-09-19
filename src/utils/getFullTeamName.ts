import { Team } from "@/types/Team";

export const getFullTemName = (teams: Team[]) => {
  if (!teams) return [];

  return teams.map((team) => {
    switch (team.name) {
      case "삼성":
        return { ...team, name: "삼성 라이온즈" };
      case "두산":
        return { ...team, name: "두산 베어스" };
      case "LG":
        return { ...team, name: "엘지 트윈스" };
      case "한화":
        return { ...team, name: "한화 이글스" };
      case "KIA":
        return { ...team, name: "기아 타이거즈" };
      case "SSG":
        return { ...team, name: "SSG 랜더스" };
      case "NC":
        return { ...team, name: "NC 다이노스" };
      case "롯데":
        return { ...team, name: "롯데 자이언츠" };
      case "키움":
        return { ...team, name: "키움 히어로즈" };
      case "KT":
        return { ...team, name: "KT 위즈" };
      default:
        return team;
    }
  });
};
