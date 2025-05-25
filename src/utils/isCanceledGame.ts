import { GAMESTATUS_CANCELED } from "@/constants";
import { GameStatusCanceledType, GameStatusType } from "@/types/Game";

export const isCanceledGame = (status: GameStatusType) => {
  return GAMESTATUS_CANCELED.includes(status as GameStatusCanceledType);
};
