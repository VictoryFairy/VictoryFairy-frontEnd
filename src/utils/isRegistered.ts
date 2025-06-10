import { Game } from "@/types/Game";

/**
 * 게임 등록 여부를 확인하는 함수
 * @param group - 확인할 게임 그룹
 * @returns 게임 등록 여부
 *
 * 일반게임: 해당 게임이 등록되어 있는지 확인
 * 더블헤더: 두 게임이 모두 등록되어 있는지 확인
 */
export const isRegistered = (group: Game[], registeredGameIds: string[]) => {
  // 일반게임일 경우
  if (group.length === 1) {
    return registeredGameIds.includes(group[0].id);
  }
  // 더블헤더일 경우
  if (group.length === 2) {
    return (
      registeredGameIds.includes(group[0].id) &&
      registeredGameIds.includes(group[1].id)
    );
  }
  return false;
};
