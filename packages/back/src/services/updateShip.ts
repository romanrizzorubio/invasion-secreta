import { PhaseDict } from "../types/dicts";
import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";
import { isOpen } from "../model/ship";

export function updateShip(tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber - 1];

    if (!table) throw new Error("Table not found");

    table.ship++;

    if (isOpen(data)) {
      data.phase = PhaseDict.SHIP_OPEN;
    }
  });

  broadcastGame();
  return state;
}
