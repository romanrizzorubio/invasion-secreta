import { GameData } from "../types/GameData";

export const getDamage = (data: GameData) =>
  data.tables.reduce((acc, table) => acc + table.superDamage, 0);

export const getThreat = (data: GameData) =>
  data.superPlanIni + data.tables.reduce((acc, table) => acc + table.superThreat, 0);

export const isDefeated = (data: GameData) => {
  const damage = getDamage(data);

  return damage >= data.superLifeMax;
};

export const isCompleted = (data: GameData) => {
  const threat = getThreat(data);

  return threat >= data.superPlanMax;
};
