import { describe, it, expect } from "vitest";
import { getNumPlayers } from "../../../src/model/players";
import { GameData } from "../../../src/types/GameData";

describe("players", () => {
  describe("getNumPlayers", () => {
    it("should return 0 for both normal and expert when there are no tables", () => {
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

      expect(getNumPlayers(data)).toEqual({
        normal: 0,
        expert: 0
      });
    });

    it("should count normal players correctly", () => {
      const data: GameData = {
        tables: [
          {
            players: [{}, {}, {}] as any[],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          },
          {
            players: [{}, {}] as any[],
            saved: false,
            expert: false,
            spiderWoman: 0,
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

      expect(getNumPlayers(data)).toEqual({
        normal: 5,
        expert: 0
      });
    });

    it("should count expert players correctly", () => {
      const data: GameData = {
        tables: [
          {
            players: [{}, {}] as any[],
            saved: false,
            expert: true,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          },
          {
            players: [{}, {}, {}] as any[],
            saved: false,
            expert: true,
            spiderWoman: 0,
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

      expect(getNumPlayers(data)).toEqual({
        normal: 0,
        expert: 5
      });
    });

    it("should count both normal and expert players separately", () => {
      const data: GameData = {
        tables: [
          {
            players: [{}, {}] as any[],
            saved: false,
            expert: false,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          },
          {
            players: [{}, {}, {}] as any[],
            saved: false,
            expert: true,
            spiderWoman: 0,
            superDamage: 0,
            superThreat: 0,
            ship: 0,
            completeVeranke: false,
            enemy: 0,
            exposed: 0
          },
          {
            players: [{}] as any[],
            saved: false,
            expert: false,
            spiderWoman: 0,
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

      expect(getNumPlayers(data)).toEqual({
        normal: 3,
        expert: 3
      });
    });
  });
});
