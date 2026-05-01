import { describe, it, expect, beforeEach, vi } from "vitest";
import { advanceGame } from "../../src/services/advanceGame";
import { resetGameState, updateGameState } from "../../src/store/gameStore";
import { PhaseDict } from "../../src/types/dicts";
import * as socket from "../../src/sockets/socket";

vi.mock("../../src/sockets/socket", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    broadcastGame: vi.fn(),
    setSocketServer: vi.fn(),
  };
});

describe("advanceGame", () => {
  beforeEach(() => {
    resetGameState();
    vi.clearAllMocks();
  });

  it("should advance from SUPER_WINER to SHIP_FALL", () => {
    updateGameState((data) => {
      data.phase = PhaseDict.SUPER_WINER;
    });

    const result = advanceGame();
    expect(result.phase).toBe(PhaseDict.SHIP_FALL);
  });

  it("should advance from SUPER_DEFEATED to SHIP_FALL", () => {
    updateGameState((data) => {
      data.phase = PhaseDict.SUPER_DEFEATED;
    });

    const result = advanceGame();
    expect(result.phase).toBe(PhaseDict.SHIP_FALL);
  });

  it("should advance from SPIDER_WOMAN_LEAVES to SHIP_FALL", () => {
    updateGameState((data) => {
      data.phase = PhaseDict.SPIDER_WOMAN_LEAVES;
    });

    const result = advanceGame();
    expect(result.phase).toBe(PhaseDict.SHIP_FALL);
  });

  it("should advance from SHIP_OPEN to ENEMY", () => {
    updateGameState((data) => {
      data.phase = PhaseDict.SHIP_OPEN;
    });

    const result = advanceGame();
    expect(result.phase).toBe(PhaseDict.ENEMY);
  });

  it("should not change phase for other phases", () => {
    const phases = [
      PhaseDict.INIT,
      PhaseDict.TABLES,
      PhaseDict.SHIP_FALL,
      PhaseDict.ENEMY
    ];

    phases.forEach((phase) => {
      resetGameState();
      updateGameState((data) => {
        data.phase = phase;
      });

      const result = advanceGame();
      expect(result.phase).toBe(phase);
    });
  });

  it("should call broadcastGame", () => {
    updateGameState((data) => {
      data.phase = PhaseDict.SHIP_OPEN;
    });

    advanceGame();
    expect(socket.broadcastGame).toHaveBeenCalledTimes(1);
  });
});
