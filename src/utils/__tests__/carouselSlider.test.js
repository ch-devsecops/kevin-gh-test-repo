import {
  getBackgroundColorToken,
  getForegroundColorToken,
  getIconColorToken
} from '../carouselSlider';
import {
  chevronColourTokenForParam,
  colourTokenForParam,
  foregroundColourTokenForParam,
} from '../sitecoreFields';

describe('carouselSlider utils', () => {
  describe('getBackgroundColorToken', () => {
    it('returns "black" if isDark is true', () => {
      expect(getBackgroundColorToken(true)).toBe('black');
    });

    it('returns "white" if paramColorToken is not provided', () => {
      expect(getBackgroundColorToken(false)).toBe('white');
    });

    it('returns the matching colourTokenForParam if paramColorToken is provided', () => {
      expect(getBackgroundColorToken(false, 'red')).toBe(colourTokenForParam['red']);
    });
  });

  describe('getForegroundColorToken', () => {
    it('returns "white" if isDark is true', () => {
      expect(getForegroundColorToken(true)).toBe('white');
    });

    it('returns "black" if paramColorToken is not provided', () => {
      expect(getForegroundColorToken(false)).toBe('black');
    });

    it('returns the matching foregroundColourTokenForParam if paramColorToken is provided', () => {
      expect(getForegroundColorToken(false, 'blue')).toBe(foregroundColourTokenForParam['blue']);
    });
  });

  describe('getIconColorToken', () => {
    it('returns "grey.2" if isDark is true', () => {
      expect(getIconColorToken(true)).toBe('grey.2');
    });

    it('returns "grey.0" if paramColorToken is not provided', () => {
      expect(getIconColorToken(false)).toBe('grey.0');
    });

    it('returns the matching chevronColourTokenForParam if paramColorToken is provided', () => {
      expect(getIconColorToken(false, 'green')).toBe(chevronColourTokenForParam['green']);
    });
  });
});
