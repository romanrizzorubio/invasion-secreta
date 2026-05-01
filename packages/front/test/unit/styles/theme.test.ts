import { theme } from '../../../src/styles/theme';

describe('theme', () => {
  it('should have colors defined', () => {
    expect(theme.colors).toBeDefined();
    expect(theme.colors.aspects).toBeDefined();
    expect(theme.colors.background).toBeDefined();
    expect(theme.colors.text).toBeDefined();
    expect(theme.colors.border).toBeDefined();
  });

  it('should have all aspect colors', () => {
    expect(theme.colors.aspects.basic).toBe('#bfbfbf');
    expect(theme.colors.aspects.aggression).toBe('#ac0202');
    expect(theme.colors.aspects.justice).toBe('#e1ba00');
    expect(theme.colors.aspects.protection).toBe('#069a04');
    expect(theme.colors.aspects.leadership).toBe('#1841ca');
    expect(theme.colors.aspects.pool).toBe('#b609ca');
  });

  it('should have background colors', () => {
    expect(theme.colors.background.primary).toBe('#ffffff');
    expect(theme.colors.background.secondary).toBe('#000000');
    expect(theme.colors.background.tertiary).toBe('#57e851');
  });

  it('should have text colors', () => {
    expect(theme.colors.text.primary).toBe('#000000');
    expect(theme.colors.text.secondary).toBe('#ffffff');
    expect(theme.colors.text.tertiary).toBe('#204c1f');
    expect(theme.colors.text.quaternary).toBe('#57e851');
  });

  it('should have border colors', () => {
    expect(theme.colors.border.primary).toBe('#000000');
    expect(theme.colors.border.secondary).toBe('#ffffff');
    expect(theme.colors.border.tertiary).toBe('#204c1f');
  });

  it('should have shadows defined', () => {
    expect(theme.shadows.primary).toBe('2px 2px 0 #ffffff');
    expect(theme.shadows.secondary).toBe('2px 2px 0 #000000');
    expect(theme.shadows.tertiary).toBe('2px 2px 0 #204c1f');
  });

  it('should have progress colors', () => {
    expect(theme.progress.low).toBe('#45a341');
    expect(theme.progress.medium).toBe('#f59e0b');
    expect(theme.progress.high).toBe('#e74c3c');
  });

  it('should have typography sizes', () => {
    expect(theme.typography.sizes.S).toBe('12px');
    expect(theme.typography.sizes.M).toBe('1rem');
    expect(theme.typography.sizes.L).toBe('24px');
    expect(theme.typography.sizes.XL).toBe('32px');
    expect(theme.typography.sizes.XXL).toBe('64px');
    expect(theme.typography.sizes.XXXL).toBe('128px');
  });

  it('should be a valid theme object', () => {
    expect(typeof theme).toBe('object');
    expect(theme).not.toBeNull();
  });
});
