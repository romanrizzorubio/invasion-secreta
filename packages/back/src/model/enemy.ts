import { GameData } from "../types/GameData";

export const getEnemy = (data: GameData) =>
  data.tables.reduce((acc, table) => acc + table.enemy, 0);

export const isDefeated = (data: GameData) => {
  const threat = getEnemy(data);

  return threat >= data.enemyInit;
};
