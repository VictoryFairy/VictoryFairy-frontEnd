export const getStadiumId = (teamId: number): number => {
  const stadiumMap: Record<number, number> = {
    1: 8, // 롯데 - 사직
    2: 1, // 두산 - 잠실
    3: 9, // KIA - 광주
    4: 4, // 삼성 - 대구
    5: 6, // SSG - 문학
    6: 2, // NC - 창원
    7: 1, // LG - 잠실
    8: 3, // 키움 - 고척
    9: 7, // KT - 수원
    10: 5, // 한화 - 대전
  };

  return stadiumMap[teamId];
};
