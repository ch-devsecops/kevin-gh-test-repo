import { getComparePageUrl } from '../service/utils';

describe('getComparePageUrl', () => {
  const MC_PRODUCT_NAME = 'Mc';
  const ATV_PRODUCT_NAME = 'AtvSxs';
  test('returns correct URL when all objects have the same productline value (MC)', () => {
    const data = [{ productline: MC_PRODUCT_NAME }, { productline: MC_PRODUCT_NAME }, { productline: MC_PRODUCT_NAME }];

    const result = getComparePageUrl(data);

    expect(result).toBe('Shared.Common.comparePageMcUrl');
  });

  test('returns correct URL when all objects have the same productline value (non-MC)', () => {
    const data = [
      { productline: ATV_PRODUCT_NAME },
      { productline: ATV_PRODUCT_NAME },
      { productline: ATV_PRODUCT_NAME },
    ];

    const result = getComparePageUrl(data);

    expect(result).toBe('Shared.Common.comparePageAtvSxsUrl');
  });

  test('returns empty string when some objects have different productline values', () => {
    const data = [
      { productline: MC_PRODUCT_NAME },
      { productline: ATV_PRODUCT_NAME },
      { productline: MC_PRODUCT_NAME },
    ];

    const result = getComparePageUrl(data);

    expect(result).toBe('');
  });

  test('returns empty string when the array is empty', () => {
    const data = [];

    const result = getComparePageUrl(data);

    expect(result).toBe('');
  });
});
