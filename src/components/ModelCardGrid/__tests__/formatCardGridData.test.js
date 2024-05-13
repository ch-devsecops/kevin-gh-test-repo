import formatCardGridData from '../utils/formatCardGridData';
import mockData from '../__mocks__/mockProps.json';

const data = mockData.fields?.data?.value?.catalog?.fields?.models?.[0]?.items;

describe('formatCardsGridData', () => {
  it('should expose a function', () => {
    expect(formatCardGridData).toBeDefined();
  });

  it('formatCardsGridData should return an empty array when input is invalid', () => {
    const retValue = formatCardGridData(null);
    expect(retValue).toEqual([]);
  });

  it('formatCardsGridData should return expected output', () => {
    const retValue = formatCardGridData(data);
    expect(retValue).toMatchSnapshot();
  });
});
