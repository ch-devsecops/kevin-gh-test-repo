import { getEnginesGroupedBySpecifications } from '../utils';
import { mockMarineSpecs, mockMarineTrims } from '../__mocks__/mockSpecsMarine';

describe('getEnginesGroupedBySpecifications', () => {
  it('should expose a function', () => {
    expect(getEnginesGroupedBySpecifications).toBeDefined();
  });

  it('getEnginesGroupedBySpecifications should return expected output', () => {
    const retValue = getEnginesGroupedBySpecifications(mockMarineSpecs, mockMarineTrims);
    expect(retValue).toMatchSnapshot();
  });
});
