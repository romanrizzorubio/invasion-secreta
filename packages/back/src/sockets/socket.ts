import type { Server } from "socket.io";
import { getGameState } from "../store/gameStore";

const SOCKET_EVENT = "game:update";

let ioInstance: Server | null = null;

export function setSocketServer(io: Server): void {
  ioInstance = io;
}

export function broadcastGame(): void {
  if (!ioInstance) {
    return;
  }

  ioInstance.emit(SOCKET_EVENT, getGameState());
}

export function getSocketEvent(): string {
  return SOCKET_EVENT;
}
