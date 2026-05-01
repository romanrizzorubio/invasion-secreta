import { get, post, createSocketConnection } from '../../../../src/data/core/api';
import { io } from 'socket.io-client';

jest.mock('socket.io-client');

global.fetch = jest.fn();

describe('API Core', () => {
  const originalLocation = window.location;

  beforeAll(() => {
    delete (window as any).location;
    window.location = { ...originalLocation, hostname: 'localhost' };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should make a GET request to the correct endpoint', async () => {
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockResponse,
      });

      const result = await get('/test-endpoint');

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/test-endpoint', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors in GET requests', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(get('/test-endpoint')).rejects.toThrow('Network error');
    });
  });

  describe('post', () => {
    it('should make a POST request without body', async () => {
      const mockResponse = { success: true };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockResponse,
      });

      const result = await post('/test-endpoint');

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/test-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should make a POST request with body', async () => {
      const mockResponse = { success: true };
      const requestBody = { value: 5, table: 1 };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockResponse,
      });

      const result = await post('/test-endpoint', requestBody);

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/test-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors in POST requests', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Server error'));

      await expect(post('/test-endpoint', { data: 'test' })).rejects.toThrow('Server error');
    });
  });

  describe('createSocketConnection', () => {
    it('should create a socket connection with correct configuration', () => {
      const mockSocket = { id: 'mock-socket-id' };
      (io as jest.Mock).mockReturnValueOnce(mockSocket);

      const socket = createSocketConnection();

      expect(io).toHaveBeenCalledWith('http://localhost:4000', {
        transports: ['polling', 'websocket'],
      });
      expect(socket).toEqual(mockSocket);
    });
  });
});
