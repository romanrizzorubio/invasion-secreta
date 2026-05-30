import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { getThreat, isCompleted } from "../model/veranke";

export function updateExposed(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const threat = getThreat(data);
    const table = data.tables[tableNumber];

    if (!table) throw new Error("Table not found");

    const actualThreat = threat + value < 0 ? -threat : value;

    table.exposed += actualThreat;

    if (data.phase === PhaseDict.ENEMY && isCompleted(data)) {
      data.phase = PhaseDict.OSBORN_REVEAL;
    }
  });

  broadcastGame();
  return state;
}
