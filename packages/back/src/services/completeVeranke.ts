import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";

export function completeVeranke(tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const table = data.tables[tableNumber - 1];

    if (!table) throw new Error("Table not found");

    table.completeVeranke = true;
  });

  broadcastGame();
  return state;
}
