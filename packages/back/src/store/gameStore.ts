import type { GameData } from "../types/GameData";
import { PhaseDict } from "../types/dicts";

const INITIAL: GameData = {
  tables: [],
  phase: PhaseDict.INIT,
  superLifeMax: 0,
  superPlanIni: 0,
  superPlanMax: 0,
  spiderWomanMax: 0,
  shipMax: 0,
  enemyInit: 0,
  exposedMax: 0,
  end: Date.now()
};

let gameState: GameData = {
  ...INITIAL
};

export function getGameState(): GameData {
  return gameState;
}

export function setGameState(nextState: GameData): GameData {
  gameState = nextState;
  return gameState;
}

export function updateGameState(updater: (state: GameData) => void): GameData {
  updater(gameState);
  return gameState;
}

export function resetGameState(): GameData {
  gameState = {
    ...INITIAL
  };

  return gameState;
}
