import { getInitialState, reducer, SET_PRESELECTED } from '../reducer';
import { contentJson, contentJsonNoTrim } from '../mockTestData';

describe('getInitialState()', () => {
  it('should not throw an error with undefined JSON', () => {
    const actual = () => getInitialState(undefined);
    expect(Object.keys(actual).length).toBe(0);
  });

  it('should not throw an error with invalid JSON', () => {
    const actual = () => getInitialState('{\r\n  "trim": {\r\n        "label": "Trim"\r\n      }\r\n}');
    expect(Object.keys(actual).length).toBe(0);
  });

  it('should return initial state with NO trim dropdown', () => {
    const actual = getInitialState(contentJsonNoTrim);
    expect(actual.dropdowns[2]).toBeFalsy();
  });

  describe('getInitialState() with trim Dropdown', () => {
    const actual = getInitialState(contentJson);

    it('should return valid dropdown items', () => {
      expect(actual.dropdowns[0]).toHaveProperty('label', 'Year');
      expect(actual.dropdowns[1]).toHaveProperty('label', 'Model');
      expect(actual.dropdowns[2]).toHaveProperty('label', 'Trim');
    });

    it('should return valid year options', () => {
      expect(actual.options.year[0].value).toEqual('2018');
    });

    it('should return empty model and trim options', () => {
      expect(actual.options.model.length).toBeFalsy();
      expect(actual.options.trim.length).toBeFalsy();
    });

    it('should return empty selectedOptions', () => {
      expect(actual.selectedOptions).toEqual({});
    });

    it('should return empty errors', () => {
      expect(actual.errors).toEqual({});
    });

    it('should return the ctaOptions and falsy selectedUrl', () => {
      expect(actual.selectedUrl).toBeFalsy();
      expect(actual.ctaOptions).toHaveLength(2);
    });
  });
});

describe('SET_PRESELECTED action', () => {
  describe('PRE_SELECTED with valid payload', () => {
    const dispatch = action => reducer(getInitialState(contentJson), action);
    const payload = {
      year: '2018',
      model: 'Civic',
      trim: 'Civic DX',
    };
    const actual = dispatch({
      type: SET_PRESELECTED,
      payload,
    });

    it('should return valid options', () => {
      expect(actual.options.year[0]).toHaveProperty('value', payload.year);
      expect(actual.options.model[0]).toHaveProperty('value', payload.model);
      expect(actual.options.trim[0]).toHaveProperty('value', payload.trim);
    });
    it('should return valid selectedOptions', () => {
      expect(actual.selectedOptions).toEqual(payload);
    });
    it('should return valid (but unencoded) selectedUrl', () => {
      expect(actual.selectedUrl).toEqual('url1?year=2018&model=Civic&trim=Civic DX');
    });
  });

  describe('PRE_SELECTED with invalid model and trim', () => {
    const dispatch = action => reducer(getInitialState(contentJson), action);
    const actual = dispatch({
      type: SET_PRESELECTED,
      payload: {
        year: '2018',
        model: 'Civi',
        trim: 'Civic DX',
      },
    });

    it('should return valid selected year', () => {
      expect(actual.selectedOptions).toHaveProperty('year', '2018');
    });
    it('should return falsy selected model and trim', () => {
      expect(actual.selectedOptions.model).toBeFalsy();
      expect(actual.selectedOptions.trim).toBeFalsy();
    });
    it('should return model options and empty trim options', () => {
      expect(actual.options.model[0]).toHaveProperty('value', 'Civic');
      expect(actual.options.trim).toHaveLength(0);
    });
  });

  describe('PRE_SELECTED with invalid year', () => {
    const dispatch = action => reducer(getInitialState(contentJson), action);
    const actual = dispatch({
      type: SET_PRESELECTED,
      payload: {
        year: '2022',
        model: 'Civic',
        trim: 'Civic DX',
      },
    });

    it('should return default options', () => {
      expect(actual.options.year[0]).toHaveProperty('value', '2018');
      expect(actual.options.model).toHaveLength(0);
      expect(actual.options.trim).toHaveLength(0);
    });
    it('should return empty model and trim options', () => {
      expect(actual.options.model).toHaveLength(0);
      expect(actual.options.trim).toHaveLength(0);
    });
    it('should return empty selected options', () => {
      expect(actual.selectedOptions).toEqual({});
    });
  });
});
