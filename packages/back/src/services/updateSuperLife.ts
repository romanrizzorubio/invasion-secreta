import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { getDamage, isDefeated } from "../model/super";

export function updateSuperLife(value: number, tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber - 1];

    if (!table) throw new Error("Table not found");

    if (value > 0) {
      table.superDamage += value;

      if (isDefeated(data)) {
        data.phase = PhaseDict.SUPER_DEFEATED;
      }
    } else {
      const availableDamage = getDamage(data);
      const actualDamage = -value > availableDamage ? -availableDamage : value;

      table.superDamage += actualDamage;
    }
  });

  broadcastGame();
  return state;
}
