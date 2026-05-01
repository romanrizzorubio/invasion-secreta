import { describe, it, expect, beforeEach } from "vitest";
import {
  getGameState,
  setGameState,
  updateGameState,
  resetGameState
} from "../../../src/store/gameStore";
import { PhaseDict } from "../../../src/types/dicts";
import type { GameData } from "../../../src/types/GameData";

describe("gameStore", () => {
  beforeEach(() => {
    resetGameState();
  });

  describe("getGameState", () => {
    it("should return the current game state", () => {
      const state = getGameState();
      expect(state).toBeDefined();
      expect(state.phase).toBe(PhaseDict.INIT);
      expect(state.tables).toEqual([]);
    });
  });

  describe("setGameState", () => {
    it("should set a new game state", () => {
      const newState: GameData = {
        tables: [],
        phase: PhaseDict.TABLES,
        superLifeMax: 10,
        superPlanIni: 5,
        superPlanMax: 15,
        spiderWomanMax: 8,
        shipMax: 6,
        enemyInit: 3,
        exposedMax: 4,
        end: Date.now()
      };

      const result = setGameState(newState);
      expect(result).toEqual(newState);
      expect(getGameState()).toEqual(newState);
    });
  });

  describe("updateGameState", () => {
    it("should update the game state using an updater function", () => {
      const initialState = getGameState();
      expect(initialState.phase).toBe(PhaseDict.INIT);

      updateGameState((state) => {
        state.phase = PhaseDict.TABLES;
        state.superLifeMax = 20;
      });

      const updatedState = getGameState();
      expect(updatedState.phase).toBe(PhaseDict.TABLES);
      expect(updatedState.superLifeMax).toBe(20);
    });

    it("should mutate the state directly", () => {
      updateGameState((state) => {
        state.tables = [{ id: 1 } as any];
      });

      const state = getGameState();
      expect(state.tables).toHaveLength(1);
    });
  });

  describe("resetGameState", () => {
    it("should reset the game state to initial values", () => {
      // First modify the state
      updateGameState((state) => {
        state.phase = PhaseDict.TABLES;
        state.superLifeMax = 100;
        state.tables = [{ id: 1 } as any];
      });

      // Verify state was modified
      let state = getGameState();
      expect(state.phase).toBe(PhaseDict.TABLES);
      expect(state.superLifeMax).toBe(100);

      // Reset
      resetGameState();

      // Verify state is reset
      state = getGameState();
      expect(state.phase).toBe(PhaseDict.INIT);
      expect(state.superLifeMax).toBe(0);
      expect(state.tables).toEqual([]);
    });
  });
});
