import { describe, it, expect, beforeEach, vi } from "vitest";
import { resetGame } from "../../src/services/resetGame";
import { updateGameState, getGameState } from "../../src/store/gameStore";
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

describe("resetGame", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should reset game state to initial values", () => {
    // Modify state first
    updateGameState((data) => {
      data.phase = PhaseDict.TABLES;
      data.superLifeMax = 100;
      data.tables = [{ id: 1 } as any];
    });

    // Reset
    const result = resetGame();

    expect(result.phase).toBe(PhaseDict.INIT);
    expect(result.superLifeMax).toBe(0);
    expect(result.tables).toEqual([]);
  });

  it("should call broadcastGame after reset", () => {
    resetGame();
    expect(socket.broadcastGame).toHaveBeenCalledTimes(1);
  });

  it("should return the reset state", () => {
    const result = resetGame();
    const currentState = getGameState();

    expect(result).toEqual(currentState);
  });
});
