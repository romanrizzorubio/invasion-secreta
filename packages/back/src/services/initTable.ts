import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import { TableData } from "../types/TableData";
import { PlayerData } from "../types/PlayerData";
import { GameData } from "../types/GameData";

export function initTable(tableNumber: number, players: PlayerData[], expert: boolean): GameData {
  const state = updateGameState((data) => {
    const currentTable = data.tables[tableNumber - 1];

    if (currentTable) {
      throw new Error("Table already exists");
    } else {
      const table: TableData = {
        players,
        expert,
        saved: true,
        superDamage: 0,
        superThreat: 0,
        spiderWoman: 0,
        ship: 0,
        completeVeranke: false,
        enemy: 0,
        exposed: 0
      };

      data.tables[tableNumber - 1] = table;
    }
  });

  broadcastGame();
  return state;
}
