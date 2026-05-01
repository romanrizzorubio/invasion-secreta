import { describe, it, expect } from "vitest";
import { getEnemy, isDefeated } from "../../../src/model/enemy";
import { GameData } from "../../../src/types/GameData";

describe("enemy", () => {
  describe("getEnemy", () => {
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

      expect(getEnemy(data)).toBe(0);
    });

    it("should return the sum of enemy counters from all tables", () => {
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
            enemy: 3,
            exposed: 0
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
            enemy: 5,
            exposed: 0
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
            enemy: 2,
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

      expect(getEnemy(data)).toBe(10);
    });
  });

  describe("isDefeated", () => {
    it("should return false when enemy count is less than enemyInit", () => {
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
            enemy: 3,
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

    it("should return true when enemy count equals enemyInit", () => {
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
            enemy: 10,
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

    it("should return true when enemy count exceeds enemyInit", () => {
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
            enemy: 15,
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
});
