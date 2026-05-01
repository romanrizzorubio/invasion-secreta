import { describe, it, expect } from "vitest";
import { getLife, isDefeated } from "../../../src/model/spiderWoman";
import { GameData } from "../../../src/types/GameData";

describe("spiderWoman", () => {
  describe("getLife", () => {
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

      expect(getLife(data)).toBe(0);
    });

    it("should return the maximum spiderWoman value from all tables", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 3,
            superDamage: 0,
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
            spiderWoman: 7,
            superDamage: 0,
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
            spiderWoman: 5,
            superDamage: 0,
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

      expect(getLife(data)).toBe(7);
    });

    it("should return the single value when there is only one table", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 4,
            superDamage: 0,
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

      expect(getLife(data)).toBe(4);
    });
  });

  describe("isDefeated", () => {
    it("should return false when life is less than spiderWomanMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 5,
            superDamage: 0,
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

    it("should return true when life equals spiderWomanMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 10,
            superDamage: 0,
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

    it("should return true when life exceeds spiderWomanMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 15,
            superDamage: 0,
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
});
