import { Phase } from "./dicts";
import { TableData } from "./TableData";

export type GameData = {
  tables: TableData[];
  phase: Phase;
  spiderWomanMax: number;
  superLifeMax: number;
  superPlanIni: number;
  superPlanMax: number;
  shipMax: number;
  enemyInit: number;
  exposedMax: number;
  end: number;
  uatu?: number;
  aron?: number;
};
