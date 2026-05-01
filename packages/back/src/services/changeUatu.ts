import { updateGameState } from "../store/gameStore";
import { broadcastGame } from "../sockets/socket";
import type { GameData } from "../types/GameData";

export function changeUatu(next: boolean): GameData {
  const state = updateGameState((data) => {
    if (data.uatu !== undefined) {
      if (next) {
        data.uatu++;
        if (data.uatu >= data.tables.length) {
          data.uatu = 0;
        }
      } else {
        data.uatu--;
        if (data.uatu < 0) {
          data.uatu = data.tables.length - 1;
        }
      }
    }
  });

  broadcastGame();
  return state;
}
