import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { isDefeated } from "../model/enemy";

export function updateEnemy(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber - 1];

    if (!table) throw new Error("Table not found");

    table.enemy += value;

    if (isDefeated(data)) {
      data.phase = PhaseDict.VERANKE_LOSE;
    }
  });

  broadcastGame();
  return state;
}
