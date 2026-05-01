import { GameData } from "../types/GameData";

export const getThreat = (data: GameData) =>
  data.tables.reduce((acc, table) => acc + table.exposed, 0);

export const isCompleted = (data: GameData) => {
  const threat = getThreat(data);

  return threat >= data.exposedMax;
};
