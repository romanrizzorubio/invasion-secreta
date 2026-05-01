import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { getThreat, isCompleted } from "../model/super";

export function updateSuperPlan(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const threat = getThreat(data);
    const table = data.tables[tableNumber - 1];

    if (!table) throw new Error("Table not found");

    const actualThreat = threat + value < 0 ? -threat : value;

    table.superThreat += actualThreat;

    if (isCompleted(data)) {
      data.phase = PhaseDict.SUPER_WINER;
    }
  });

  broadcastGame();
  return state;
}
