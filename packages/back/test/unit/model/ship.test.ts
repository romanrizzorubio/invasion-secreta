import { describe, it, expect } from "vitest";
import { getShipCounters, isOpen } from "../../../src/model/ship";
import { GameData } from "../../../src/types/GameData";

describe("ship", () => {
  describe("getShipCounters", () => {
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

      expect(getShipCounters(data)).toBe(0);
    });

    it("should return the sum of ship counters from all tables", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 2,
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
            superThreat: 0,
            ship: 3,
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
            superThreat: 0,
            ship: 1,
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

      expect(getShipCounters(data)).toBe(6);
    });
  });

  describe("isOpen", () => {
    it("should return false when ship counters are less than shipMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 3,
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

      expect(isOpen(data)).toBe(false);
    });

    it("should return true when ship counters equal shipMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 10,
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

      expect(isOpen(data)).toBe(true);
    });

    it("should return true when ship counters exceed shipMax", () => {
      const data: GameData = {
        tables: [
          {
            players: [],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 15,
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

      expect(isOpen(data)).toBe(true);
    });
  });
});
