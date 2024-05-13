import { getPSPCategorizedSpecifications, getPspProductCardTitle } from '../utils';
import mockSpec from '../__mocks__/mockSpecs';

describe('getPSPCategorizedSpecifications', () => {
  it('should expose a function', () => {
    expect(getPSPCategorizedSpecifications).toBeDefined();
  });

  it('getPSPCategorizedSpecifications should return an empty array when specifications is not valid', () => {
    const retValue = getPSPCategorizedSpecifications(null);
    expect(retValue).toEqual([]);
  });

  it('getPSPCategorizedSpecifications should return expected output', () => {
    const retValue = getPSPCategorizedSpecifications(mockSpec);
    expect(retValue).toMatchSnapshot();
  });
});

describe('getPspProductCardTitle', () => {
  it('should expose a function', () => {
    expect(getPspProductCardTitle).toBeDefined();
  });

  it('getPspProductCardTitle should return an empty string when all values are not valid', () => {
    const retValue = getPspProductCardTitle({});
    expect(retValue).toEqual('');
  });

  it('getPspProductCardTitle should filter out invalid values', () => {
    const retValue = getPspProductCardTitle({ year: '2023', model: 'Rebel 1100', transmission: undefined });
    expect(retValue).toEqual('2023 Rebel 1100');
  });

  it('getPspProductCardTitle should return expected output', () => {
    const retValue = getPspProductCardTitle({ year: '2022', model: 'Gold Wing', transmission: 'ABS' });
    expect(retValue).toEqual('2022 Gold Wing ABS');
  });
});
