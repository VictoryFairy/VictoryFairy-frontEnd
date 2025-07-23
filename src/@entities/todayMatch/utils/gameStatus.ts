import {
  GAMESTATUS_CANCELED,
  GAMESTATUS_CANCELED_DEFAULT,
  GAMESTATUS_PREPARING,
  GameStatusType,
  GameStatusCanceledType,
} from "@/@entities/todayMatch";

/**
 * 경기 상태 변환
 * @param status 경기 상태
 * @returns 경기 상태
 */
export const getStatus = (status: GameStatusType): GameStatusType => {
  if (GAMESTATUS_CANCELED.includes(status as GameStatusCanceledType)) {
    return GAMESTATUS_CANCELED_DEFAULT;
  }
  return status;
};

/**
 * 경기 점수 없는 상태 확인
 * @param status 경기 상태
 * @returns 경기 점수 없는 상태 여부
 */
export const isNoScoreStatus = (status: GameStatusType) => {
  return (
    status === GAMESTATUS_PREPARING ||
    GAMESTATUS_CANCELED.includes(status as GameStatusCanceledType)
  );
};
