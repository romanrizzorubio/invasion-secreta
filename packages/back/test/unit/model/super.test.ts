import { describe, it, expect } from "vitest";
import { getDamage, getThreat, isDefeated, isCompleted } from "../../../src/model/super";
import { GameData } from "../../../src/types/GameData";

describe("super", () => {
  describe("getDamage", () => {
    it("should return 0 when there are no tables", () => {
      const data: GameData = {
        tables: [],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 0,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(getDamage(data)).toBe(0);
    });

    it("should return the sum of superDamage from all tables", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 3,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          },
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 5,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          },
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 2,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          }
        ],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 0,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(getDamage(data)).toBe(10);
    });
  });

  describe("getThreat", () => {
    it("should return superPlanIni when there are no tables", () => {
      const data: GameData = {
        tables: [],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 5,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(getThreat(data)).toBe(5);
    });

    it("should return superPlanIni plus sum of superThreat from all tables", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 2,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          },
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 3,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          }
        ],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 5,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(getThreat(data)).toBe(10); // 5 + 2 + 3
    });
  });

  describe("isDefeated", () => {
    it("should return false when damage is less than superLifeMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 5,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          }
        ],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 0,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(isDefeated(data)).toBe(false);
    });

    it("should return true when damage equals superLifeMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 10,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          }
        ],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 0,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(isDefeated(data)).toBe(true);
    });

    it("should return true when damage exceeds superLifeMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 15,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          }
        ],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 0,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(isDefeated(data)).toBe(true);
    });
  });

  describe("isCompleted", () => {
    it("should return false when threat is less than superPlanMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 3,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          }
        ],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 2,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(isCompleted(data)).toBe(false); // 2 + 3 = 5 < 10
    });

    it("should return true when threat equals superPlanMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 8,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          }
        ],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 2,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(isCompleted(data)).toBe(true); // 2 + 8 = 10
    });

    it("should return true when threat exceeds superPlanMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 10,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          }
        ],
        phase: "planning",
        spiderWomanMax: 10,
        superLifeMax: 10,
        superPlanIni: 2,
        superPlanMax: 10,
        shipMax: 10,
        enemyInit: 10,
        exposedMax: 10,
        end: 0
      };

      expect(isCompleted(data)).toBe(true); // 2 + 10 = 12 > 10
    });
  });
});
