import { io, Socket } from 'socket.io-client';

const host = `http://${window.location.hostname}:4000`;

export const get = (endpoint: string) => {
  return fetch(`${host}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

export const post = (endpoint: string, body = {}) => {
  return fetch(`${host}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const createSocketConnection = (): Socket => {
  return io(host, {
    transports: ['polling', 'websocket'],
  });
};
