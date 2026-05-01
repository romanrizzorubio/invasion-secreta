import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";

export function advanceGame(): GameData {
  const state = updateGameState((data) => {
    if (
      data.phase === PhaseDict.SUPER_WINER ||
      data.phase === PhaseDict.SUPER_DEFEATED ||
      data.phase === PhaseDict.SPIDER_WOMAN_LEAVES
    ) {
      data.phase = PhaseDict.SHIP_FALL;
    } else if (data.phase === PhaseDict.SHIP_OPEN) {
      data.phase = PhaseDict.ENEMY;
    }
  });

  broadcastGame();
  return state;
}
