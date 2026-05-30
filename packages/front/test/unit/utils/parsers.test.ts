import { parseData, parseOptions, parseTable } from '../../../src/utils/parsers';
import { PhaseDict } from '../../../src/types/Dicts';

describe('Parsers', () => {
  describe('parseOptions', () => {
    it('should parse options service to options format', () => {
      const optionsService = [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
      ];

      const result = parseOptions(optionsService);

      expect(result).toEqual([
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ]);
    });

    it('should handle empty array', () => {
      const result = parseOptions([]);

      expect(result).toEqual([]);
    });

    it('should handle single option', () => {
      const optionsService = [{ id: 'hero-1', name: 'Iron Man' }];

      const result = parseOptions(optionsService);

      expect(result).toEqual([{ value: 'hero-1', label: 'Iron Man' }]);
    });
  });

  describe('parseTable', () => {
    it('should parse table service to table format', () => {
      const tableService = {
        players: [{ hero: { value: '1', label: 'Hero' } }],
        expert: true,
        saved: false,
        spiderWoman: 5,
        superDamage: 2,
        superThreat: 3,
        ship: 1,
        completeVeranke: true,
        enemy: 4,
        exposed: 6,
        uatu: false,
        aron: true,
      };

      const result = parseTable(tableService, 1);

      expect(result).toEqual({
        currentTable: 1,
        players: [{ hero: { value: '1', label: 'Hero' } }],
        expert: true,
        saved: false,
        completeVeranke: true,
        exposed: 6,
      });
    });

    it('should handle table with no players', () => {
      const tableService = {
        players: [],
        expert: false,
        saved: true,
        spiderWoman: 0,
        superDamage: 0,
        superThreat: 0,
        ship: 0,
        completeVeranke: false,
        enemy: 0,
        exposed: 0,
        uatu: false,
        aron: false,
      };

      const result = parseTable(tableService, 0);

      expect(result).toEqual({
        currentTable: 0,
        players: [],
        expert: false,
        saved: true,
        completeVeranke: false,
        exposed: 0,
      });
    });
  });

  describe('parseData', () => {
    it('should parse data service correctly', () => {
      const mockServiceData = {
        tables: [
          {
            players: [],
            expert: false,
            saved: false,
            completeVeranke: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            enemy: 0,
            exposed: 0,
            uatu: false,
            aron: false,
          },
        ],
        end: 1704067200000,
        phase: PhaseDict.SUPER,
        superLifeMax: 10,
        superPlanIni: 0,
        superPlanMax: 10,
        spiderWomanMax: 10,
        shipMax: 15,
        enemyInit: 10,
        exposedMax: 10,
        uatu: 1,
        aron: 2,
      };

      const result = parseData(mockServiceData);

      expect(result.phase).toBe(PhaseDict.SUPER);
      expect(result.tables).toHaveLength(1);
      expect(result.superLife).toBe(100);
      expect(result.ship).toBe(100);
      expect(result.spiderWomanTotal).toBe(100);
      expect(result.superPlan).toBe(0);
      expect(result.enemy).toBe(100);
      expect(result.exposed).toBe(0);
      expect(result.uatu).toBe(1);
      expect(result.aron).toBe(2);
      expect(result.end).toBeInstanceOf(Date);
    });

    it('should handle empty tables', () => {
      const mockServiceData = {
        tables: [],
        end: 1704067200000,
        phase: PhaseDict.INIT,
        superLifeMax: 10,
        superPlanIni: 0,
        superPlanMax: 10,
        spiderWomanMax: 10,
        shipMax: 15,
        enemyInit: 10,
        exposedMax: 10,
      };

      const result = parseData(mockServiceData);

      expect(result.tables).toEqual([]);
      expect(result.phase).toBe(PhaseDict.INIT);
    });

    it('should calculate percentages correctly with damage', () => {
      const mockServiceData = {
        tables: [
          {
            players: [],
            expert: false,
            saved: false,
            completeVeranke: false,
            spiderWoman: 2,
            superDamage: 3,
            superThreat: 4,
            ship: 5,
            enemy: 2,
            exposed: 3,
            uatu: false,
            aron: false,
          },
        ],
        end: 1704067200000,
        phase: PhaseDict.SUPER,
        superLifeMax: 10,
        superPlanIni: 5,
        superPlanMax: 20,
        spiderWomanMax: 10,
        shipMax: 15,
        enemyInit: 10,
        exposedMax: 10,
      };

      const result = parseData(mockServiceData);

      expect(result.superLife).toBe(70);
      expect(result.superPlan).toBe(45);
      expect(result.spiderWomanTotal).toBe(80);
      expect(result.ship).toBeCloseTo(66.67, 1);
      expect(result.enemy).toBe(80);
      expect(result.exposed).toBe(30);
    });

    it('should calculate spiderWomanOwn when currentTable is provided', () => {
      const mockServiceData = {
        tables: [
          {
            players: [],
            expert: false,
            saved: false,
            completeVeranke: false,
            spiderWoman: 3,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            enemy: 0,
            exposed: 0,
            uatu: false,
            aron: false,
          },
        ],
        end: 1704067200000,
        phase: PhaseDict.SUPER,
        superLifeMax: 10,
        superPlanIni: 0,
        superPlanMax: 10,
        spiderWomanMax: 10,
        shipMax: 15,
        enemyInit: 10,
        exposedMax: 10,
      };

      const result = parseData(mockServiceData, 0);

      expect(result.spiderWomanOwn).toBe(70);
    });

    it('should handle multiple tables correctly', () => {
      const mockServiceData = {
        tables: [
          {
            players: [],
            expert: false,
            saved: false,
            completeVeranke: false,
            spiderWoman: 2,
            superDamage: 1,
            superThreat: 2,
            ship: 3,
            enemy: 1,
            exposed: 2,
            uatu: false,
            aron: false,
          },
          {
            players: [],
            expert: true,
            saved: true,
            completeVeranke: true,
            spiderWoman: 4,
            superDamage: 2,
            superThreat: 1,
            ship: 2,
            enemy: 3,
            exposed: 1,
            uatu: false,
            aron: false,
          },
        ],
        end: 1704067200000,
        phase: PhaseDict.ENEMY,
        superLifeMax: 10,
        superPlanIni: 5,
        superPlanMax: 20,
        spiderWomanMax: 10,
        shipMax: 15,
        enemyInit: 10,
        exposedMax: 10,
      };

      const result = parseData(mockServiceData);

      expect(result.tables).toHaveLength(2);
      expect(result.superLife).toBe(70);
      expect(result.superPlan).toBe(40);
      expect(result.spiderWomanTotal).toBe(40);
      expect(result.ship).toBeCloseTo(66.67, 1);
      expect(result.enemy).toBe(60);
      expect(result.exposed).toBe(30);
    });
  });
});
