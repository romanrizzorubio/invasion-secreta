import { Data, DataService } from '../types/Data';
import { Table, TableService } from '../types/Table';
import { Option, OptionService } from '../types/Option';

export const parseOptions = (options: OptionService[]): Option[] =>
  options.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

export const parseTable = (table: TableService, currentTable: number): Table => ({
  currentTable,
  players: table.players,
  expert: table.expert,
  saved: table.saved,
  completeVeranke: table.completeVeranke,
  exposed: table.exposed,
});

export const parseData = (
  {
    end,
    tables,
    phase,
    superLifeMax,
    superPlanIni,
    superPlanMax,
    spiderWomanMax,
    shipMax,
    enemyInit,
    exposedMax,
    uatu,
    aron,
  }: DataService,
  currentTable?: number,
): Data => {
  const sumSpiderWoman = tables.reduce((acc, table) => (table ? acc + table.spiderWoman : acc), 0);
  const ownSpiderWoman =
    currentTable !== undefined && currentTable >= 0 ? tables[currentTable]?.spiderWoman : undefined;
  const sumSuperDamage = tables.reduce((acc, table) => (table ? acc + table.superDamage : acc), 0);
  const sumSuperPlan = tables.reduce((acc, table) => (table ? acc + table.superThreat : acc), 0);
  const sumShip = tables.reduce((acc, table) => (table ? acc + table.ship : acc), 0);
  const sumExposed = tables.reduce((acc, table) => (table ? acc + table.exposed : acc), 0);
  const sumEnemy = tables.reduce((acc, table) => (table ? acc + table.enemy : acc), 0);

  const spiderWoman = spiderWomanMax - sumSpiderWoman;
  const spiderWomanOwn = ownSpiderWoman !== undefined ? spiderWomanMax - ownSpiderWoman : undefined;
  const superLife = superLifeMax - sumSuperDamage;
  const superPlan = superPlanIni + sumSuperPlan;
  const ship = shipMax - sumShip;
  const exposed = sumExposed;
  const enemy = enemyInit - sumEnemy;

  return {
    tables: tables.map((table, index) => (table ? parseTable(table, index) : undefined)),
    end: new Date(end),
    phase,
    spiderWomanTotal: (spiderWoman * 100) / spiderWomanMax,
    spiderWomanTotalValue: spiderWoman,
    spiderWomanOwn:
      spiderWomanOwn !== undefined ? (spiderWomanOwn * 100) / spiderWomanMax : undefined,
    spiderWomanOwnValue: spiderWomanOwn,
    superLife: (superLife * 100) / superLifeMax,
    superLifeValue: superLife,
    superPlan: (superPlan * 100) / superPlanMax,
    superPlanValue: superPlan,
    ship: (ship * 100) / shipMax,
    shipValue: ship,
    enemy: (enemy * 100) / enemyInit,
    enemyValue: enemy,
    exposed: (exposed * 100) / exposedMax,
    exposedValue: exposed,
    exposedMax,
    uatu,
    aron,
  };
};
