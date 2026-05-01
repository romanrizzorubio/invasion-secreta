import { GameData } from "../types/GameData";

export const getShipCounters = (data: GameData) =>
  data.tables.reduce((acc, table) => acc + table.ship, 0);

export const isOpen = (data: GameData) => {
  const counters = getShipCounters(data);

  return counters >= data.shipMax;
};
