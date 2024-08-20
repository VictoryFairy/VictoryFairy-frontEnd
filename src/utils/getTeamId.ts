export const getTeamId = (name: string) => {
  const teamMap: Record<string, number> = {
    롯데: 1,
    두산: 2,
    KIA: 3,
    삼성: 4,
    SSG: 5,
    NC: 6,
    LG: 7,
    키움: 8,
    KT: 9,
    한화: 10,
  };

  return teamMap[name];
};
