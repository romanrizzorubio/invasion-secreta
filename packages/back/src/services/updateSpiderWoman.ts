import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { isDefeated } from "../model/spiderWoman";

export function updateSpiderWoman(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber - 1];

    if (!table) throw new Error("Table not found");

    if (value > 0) {
      table.spiderWoman += value;

      if (isDefeated(data)) {
        data.phase = PhaseDict.SPIDER_WOMAN_LEAVES;
      }
    } else {
      const availableDamage = -value > table.spiderWoman ? -table.spiderWoman : value;

      table.spiderWoman += availableDamage;
    }
  });

  broadcastGame();
  return state;
}
