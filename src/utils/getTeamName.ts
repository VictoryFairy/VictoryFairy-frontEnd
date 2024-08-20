export const getTeamName = (id: number) => {
  const teamMap: Record<number, string> = {
    1: "롯데",
    2: "두산",
    3: "KIA",
    4: "삼성",
    5: "SSG",
    6: "NC",
    7: "LG",
    8: "키움",
    9: "KT",
    10: "한화",
  };

  return teamMap[id];
};
