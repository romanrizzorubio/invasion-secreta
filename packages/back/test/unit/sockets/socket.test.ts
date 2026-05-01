import { describe, it, expect, vi, beforeEach } from "vitest";
import { setSocketServer, broadcastGame, getSocketEvent } from "../src/sockets/socket";
import type { Server } from "socket.io";

vi.mock("../src/store/gameStore", () => ({
  getGameState: vi.fn(() => ({ phase: "INIT", tables: [] }))
}));

describe("socket.ts", () => {
  let mockIo: Server;

  beforeEach(() => {
    mockIo = {
      emit: vi.fn()
    } as unknown as Server;
  });

  describe("setSocketServer", () => {
    it("should set the socket server instance", () => {
      expect(() => setSocketServer(mockIo)).not.toThrow();
    });
  });

  describe("broadcastGame", () => {
    it("should not emit if socket server is not set", () => {
      const mockEmit = vi.fn();
      const emptyIo = { emit: mockEmit } as unknown as Server;

      broadcastGame();

      expect(mockEmit).not.toHaveBeenCalled();
    });

    it("should emit game state when socket server is set", () => {
      setSocketServer(mockIo);

      broadcastGame();

      expect(mockIo.emit).toHaveBeenCalledWith("game:update", { phase: "INIT", tables: [] });
    });
  });

  describe("getSocketEvent", () => {
    it("should return the socket event name", () => {
      expect(getSocketEvent()).toBe("game:update");
    });
  });
});
