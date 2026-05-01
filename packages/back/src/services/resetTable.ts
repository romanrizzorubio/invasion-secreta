import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import { GameData } from "../types/GameData";

export function resetTable(tableNumber: number): GameData {
  const state = updateGameState((data) => {
    const currentTable = data.tables[tableNumber - 1];

    if (currentTable) {
      currentTable.saved = false;
    } else {
      throw new Error("Table does not exist");
    }
  });

  broadcastGame();
  return state;
}
