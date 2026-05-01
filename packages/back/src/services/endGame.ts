import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";

export function endGame(): GameData {
  const state = updateGameState((data) => {
    data.phase = PhaseDict.VERANKE_WIN;
  });

  broadcastGame();
  return state;
}
