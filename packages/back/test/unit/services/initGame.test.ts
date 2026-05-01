import { describe, it, expect, beforeEach, vi } from "vitest";
import { initGame } from "../../src/services/initGame";
import { resetGameState } from "../../src/store/gameStore";
import { PhaseDict } from "../../src/types/dicts";
import * as socket from "../../src/sockets/socket";

// Mock socket functions with side effects only
vi.mock("../../src/sockets/socket", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    broadcastGame: vi.fn(),
    setSocketServer: vi.fn(),
  };
});

describe("initGame", () => {
  beforeEach(() => {
    resetGameState();
    vi.clearAllMocks();
  });

  it("should initialize game with correct phase and end time", () => {
    const endTime = Date.now() + 10000;
    const result = initGame(endTime);

    expect(result.phase).toBe(PhaseDict.TABLES);
    expect(result.end).toBe(endTime);
    expect(result.tables).toEqual([]);
  });

  it("should reset tables to empty array", () => {
    const endTime = Date.now() + 5000;
    const result = initGame(endTime);

    expect(result.tables).toHaveLength(0);
  });

  it("should call broadcastGame", () => {
    const endTime = Date.now();
    initGame(endTime);

    expect(socket.broadcastGame).toHaveBeenCalledTimes(1);
  });

  it("should handle different end times correctly", () => {
    const endTime1 = Date.now() + 1000;
    const result1 = initGame(endTime1);
    expect(result1.end).toBe(endTime1);

    const endTime2 = Date.now() + 50000;
    const result2 = initGame(endTime2);
    expect(result2.end).toBe(endTime2);
  });
});
