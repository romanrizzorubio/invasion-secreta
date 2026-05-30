import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { isDefeated } from "../model/enemy";

export function updateEnemy(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber];

    if (!table) throw new Error("Table not found");

    table.enemy += value;

    if (data.phase === PhaseDict.ENEMY && isDefeated(data)) {
      data.phase = PhaseDict.OSBORN_REVEAL;
    }
  });

  broadcastGame();
  return state;
}
