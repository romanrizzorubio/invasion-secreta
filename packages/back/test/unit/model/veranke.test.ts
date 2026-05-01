import { describe, it, expect } from "vitest";
import { getThreat, isCompleted } from "../../../src/model/veranke";
import { GameData } from "../../../src/types/GameData";

describe("veranke", () => {
  describe("getThreat", () => {
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

      expect(getThreat(data)).toBe(0);
    });

    it("should return the sum of exposed from all tables", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 3
          },
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 5
          },
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 2
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

      expect(getThreat(data)).toBe(10);
    });
  });

  describe("isCompleted", () => {
    it("should return false when threat is less than exposedMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 5
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

      expect(isCompleted(data)).toBe(false);
    });

    it("should return true when threat equals exposedMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 10
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

      expect(isCompleted(data)).toBe(true);
    });

    it("should return true when threat exceeds exposedMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 15
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

      expect(isCompleted(data)).toBe(true);
    });
  });
});
