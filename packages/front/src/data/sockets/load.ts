import { createSocketConnection } from '../core/api';
import { endpoints } from '../core/endpoints';
import { parseData } from '../../utils/parsers';
import { Data, DataService } from '../../types/Data';
import { MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';

export type UseLoadSocket = {
  currentTable: number;
  socketRef: MutableRefObject<Socket | null>;
  openingRef: MutableRefObject<boolean>;
  handleData: (data: Data) => void;
  handleError: (error: Error) => void;
};

export const loadSocket = ({
  socketRef,
  openingRef,
  handleData,
  handleError,
  currentTable,
}: UseLoadSocket) => {
  if (openingRef.current || socketRef.current) {
    return;
  }

  openingRef.current = true;

  const socket = createSocketConnection();
  socketRef.current = socket;

  socket.on('connect', () => {
    console.log('Socket conectado:', socket.id);
    openingRef.current = false;
  });

  socket.on(endpoints.socket, (data: DataService) => {
    handleData(parseData(data, currentTable));
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket desconectado:', reason);

    if (socketRef.current === socket) {
      socketRef.current = null;
    }

    openingRef.current = false;
  });

  socket.on('connect_error', (error) => {
    handleError(error);

    socket.disconnect();

    if (socketRef.current === socket) {
      socketRef.current = null;
    }

    openingRef.current = false;
  });

  return () => {
    socket.disconnect();

    if (socketRef.current === socket) {
      socketRef.current = null;
    }

    openingRef.current = false;
  };
};
