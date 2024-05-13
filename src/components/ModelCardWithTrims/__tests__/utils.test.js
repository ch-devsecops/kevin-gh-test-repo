import {
  shouldUseDefaultModelYear,
  getDefaultModelYear,
  getActiveModelYear,
  getActiveModelYears,
} from '../service/utils';

import { parseBool } from '../../../utils/common';

describe('Web Catalog Utilities', () => {
  describe('parseBool', () => {
    it('returns true when argument is "1"', () => {
      const actual = parseBool('1');
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('returns false when argument is an empty string', () => {
      const actual = parseBool('');
      const expected = false;
      expect(actual).toEqual(expected);
    });

    it('returns false when no argument is supplied', () => {
      const actual = parseBool();
      const expected = false;
      expect(actual).toEqual(expected);
    });

    it('returns false for other strings besides "1" and ""', () => {
      const actual = parseBool('asdac');
      const expected = false;
      expect(actual).toEqual(expected);
    });

    it('returns true when argument is true', () => {
      const actual = parseBool(true);
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('returns false when argument is false', () => {
      const actual = parseBool(false);
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });

  describe('shouldUseDefaultModelYear', () => {
    it('returns true when it is true in the catalog', () => {
      const actual = shouldUseDefaultModelYear({
        value: {
          shouldUseDefaultModelYear: { value: '1' },
        },
      });
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('returns false when it is not true in the catalog', () => {
      const actual = shouldUseDefaultModelYear({
        value: {
          shouldUseDefaultModelYear: { value: '' },
        },
      });
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });

  describe('getDefaultModelYear', () => {
    it('returns default year string value from JSON', () => {
      const actual = getDefaultModelYear({
        value: {
          model: {
            fields: {
              defaultYear: {
                fields: {
                  year: {
                    value: '2021',
                  },
                },
              },
            },
          },
        },
      });

      const expected = '2021';
      expect(actual).toEqual(expected);
    });
  });

  describe('getActiveModelYear', () => {
    it('returns default year when useDefaultYear flag is true', () => {
      const actual = getActiveModelYear({
        value: {
          model: {
            fields: {
              defaultYear: {
                fields: {
                  year: {
                    value: '2021',
                  },
                },
              },
            },
          },
          shouldUseDefaultModelYear: { value: '1' },
        },
      });

      const expected = '2021';
      expect(actual).toEqual(expected);
    });

    it('returns null when useDefaultYear flag is false', () => {
      const actual = getActiveModelYear({
        value: {
          model: {
            fields: {
              defaultYear: {
                fields: {
                  year: {
                    value: '2021',
                  },
                },
              },
            },
          },
          shouldUseDefaultModelYear: { value: '' },
        },
      });

      const expected = null;
      expect(actual).toEqual(expected);
    });
  });

  describe('getActiveModelYears', () => {
    it('returns an array with a single year when useDefaultYear flag is true', () => {
      const actual = getActiveModelYears({
        value: {
          model: {
            fields: {
              defaultYear: {
                fields: {
                  year: {
                    value: '2021',
                  },
                },
              },
            },
          },
          shouldUseDefaultModelYear: { value: '1' },
        },
      });

      const expected = ['2021'];
      expect(actual).toEqual(expected);
    });

    it('returns an array with all available years when useDefaultYear flag is false', () => {
      const actual = getActiveModelYears({
        value: {
          model: {
            fields: {
              defaultYear: {
                fields: {
                  year: {
                    value: '2021',
                  },
                },
              },
              modelYears: [
                {
                  year: {
                    value: '2021',
                  },
                },
                {
                  year: {
                    value: '2022',
                  },
                },
              ],
            },
          },
          shouldUseDefaultModelYear: { value: '' },
        },
      });

      const expected = ['2021', '2022'];
      expect(actual).toEqual(expected);
    });
  });
});
