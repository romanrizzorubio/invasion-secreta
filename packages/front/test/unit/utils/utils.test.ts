import { getTableText } from '../../../src/utils/utils';

describe('utils', () => {
  describe('getTableText', () => {
    it('should return empty string when table is -1', () => {
      expect(getTableText(-1)).toBe('');
    });

    it('should return empty string when table is less than -1', () => {
      expect(getTableText(-5)).toBe('');
    });

    it('should return "Mesa 1" when table is 0', () => {
      expect(getTableText(0)).toBe('Mesa 1');
    });

    it('should return "Mesa 2" when table is 1', () => {
      expect(getTableText(1)).toBe('Mesa 2');
    });

    it('should return "Mesa 6" when table is 5', () => {
      expect(getTableText(5)).toBe('Mesa 6');
    });

    it('should return "Mesa 101" when table is 100', () => {
      expect(getTableText(100)).toBe('Mesa 101');
    });
  });
});
