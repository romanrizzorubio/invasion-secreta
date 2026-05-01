import { Phase } from './Dicts';
import { Table, TableService } from './Table';

export type DataService = {
  phase: Phase;
  tables: TableService[];
  currentTable: number;
  end: number;
  spiderWomanMax: number;
  superLifeMax: number;
  superPlanIni: number;
  superPlanMax: number;
  shipMax: number;
  enemyInit: number;
  exposedMax: number;
  uatu?: number;
  aron?: number;
};

export type Data = {
  tables: (Table | undefined)[];
  phase: Phase;
  end?: Date;
  spiderWomanTotal: number;
  spiderWomanOwn?: number;
  superLife: number;
  superPlan: number;
  ship: number;
  enemy: number;
  exposed: number;
  uatu?: number;
  aron?: number;
};
