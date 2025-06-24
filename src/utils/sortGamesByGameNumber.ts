import { Game } from "@/types/Game";

/**
 * 경기 데이터를 ID의 끝자리(경기 구분번호)를 기준으로 오름차순 정렬
 * @param games - 정렬할 경기 배열
 * @returns 경기 구분번호 순으로 정렬된 경기 배열 (1차전, 2차전 순)
 */
export const sortGamesByGameNumber = (games: Game[]): Game[] => {
  return games.sort((a, b) => {
    const gameNumberA = parseInt(a.id.slice(-1), 10); // ID 끝자리 숫자 추출
    const gameNumberB = parseInt(b.id.slice(-1), 10);

    return gameNumberA - gameNumberB; // 오름차순 정렬
  });
};
