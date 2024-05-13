import { getDropdowns, getYearOptions, getSelectedModel, getSelectedVehicle, addQueryParams } from '../utils';
import { toggleContentData, withoutTrimsData } from '../mockTestData';

describe('getYearOptions()', () => {
  it('should return an empty array', () => {
    const actual = getYearOptions(null);
    expect(actual).toEqual([]);
  });
  it('should return valid year options', () => {
    const actual = getYearOptions(toggleContentData.years);
    expect(actual).toHaveLength(2);
  });
});

describe('getSelectedVehicle()', () => {
  it('should return empty models', () => {
    const actual = getSelectedVehicle(undefined, toggleContentData.years);
    const expected = { models: [] };
    expect(actual).toEqual(expected);
  });

  it('should return valid selected vehicle and model options', () => {
    const actual = getSelectedVehicle({ year: '2018' }, toggleContentData.years);
    expect(actual.models).toHaveLength(2);
    expect(actual).toHaveProperty('selectedVehicle');
  });
});

describe('getSelectedModel()', () => {
  const { selectedVehicle } = getSelectedVehicle({ year: '2018' }, toggleContentData.years);
  it('should return empty trims', () => {
    const actual = getSelectedModel(undefined, selectedVehicle);
    const expected = { trims: [] };
    expect(actual).toEqual(expected);
  });

  it('should return valid selected model and trim options', () => {
    const actual = getSelectedModel({ model: 'Civic' }, selectedVehicle);
    expect(actual.trims).toHaveLength(2);
    expect(actual).toHaveProperty('ctaType');
  });
});

describe('getDropdowns()', () => {
  it('should return an empty array', () => {
    let actual = getDropdowns(null);
    expect(actual).toEqual([]);

    actual = getDropdowns([]);
    expect(actual).toEqual([]);
  });

  it('should return valid dropdown labels', () => {
    const actual = getDropdowns(toggleContentData.toggleLabels);
    expect(actual).toHaveLength(3);
    expect(actual[0].key).toEqual('year');
    expect(actual[2]).toBeTruthy();
  });

  it('should return falsy trim dropdown label', () => {
    const actual = getDropdowns(withoutTrimsData.toggleLabels);
    expect(actual[2]).toBeFalsy();
  });
});

describe('addQueryParams()', () => {
  it('should return undefined', () => {
    const actual1 = addQueryParams(undefined, { year: '2018' });
    const actual2 = addQueryParams('url', undefined);
    expect(actual1).toBeFalsy();
    expect(actual2).toBeFalsy();
  });

  it('should return path with unencoded query params', () => {
    const actual = addQueryParams('url', { year: '2018' });
    const expected = 'url?year=2018';
    expect(actual).toEqual(expected);
  });
});
