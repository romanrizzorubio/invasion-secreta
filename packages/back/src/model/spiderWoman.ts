import { GameData } from "../types/GameData";

export const getLife = (data: GameData) =>
  data.tables.reduce((acc, table) => (acc > table.spiderWoman ? acc : table.spiderWoman), 0);

export const isDefeated = (data: GameData) => {
  const life = getLife(data);

  return life >= data.spiderWomanMax;
};
