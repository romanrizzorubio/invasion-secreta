import { GameData } from "../types/GameData";

export const getNumPlayers = (data: GameData) =>
  data.tables.reduce(
    (acc, table) => {
      if (table.expert) {
        return {
          ...acc,
          expert: acc.expert + table.players.length
        };
      }

      return {
        ...acc,
        normal: acc.normal + table.players.length
      };
    },
    {
      normal: 0,
      expert: 0
    }
  );
