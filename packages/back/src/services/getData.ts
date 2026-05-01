import { getGameState } from "../store/gameStore";
import type { GameData } from "../types/GameData";

export function getData(): GameData {
  return getGameState();
}
