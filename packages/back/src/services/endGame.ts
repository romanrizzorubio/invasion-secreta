import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";

export function endGame(): GameData {
  const state = updateGameState((data) => {
    if (data.phase < PhaseDict.OSBORN_REVEAL) {
      data.phase = PhaseDict.OSBORN_REVEAL;
    }
  });

  broadcastGame();
  return state;
}
