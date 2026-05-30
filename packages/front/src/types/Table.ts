import { Player } from './Player';

export type TableService = {
  players: Player[];
  expert: boolean;
  saved: boolean;
  spiderWoman: number;
  superDamage: number;
  superThreat: number;
  ship: number;
  completeVeranke: boolean;
  enemy: number;
  exposed: number;
  uatu: boolean;
  aron: boolean;
};

export type Table = {
  currentTable: number;
  players: Player[];
  saved: boolean;
  expert: boolean;
  completeVeranke: boolean;
  exposed: number;
};
