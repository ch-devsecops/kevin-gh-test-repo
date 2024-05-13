import getValueByKey from '../getValueByKey';
import { fields, item, items } from '../getValueByKey.mock';

describe('getValueByKey', () => {
  it('returns an array of fields items', () => {
    const value = getValueByKey(fields, 'key');
    expect(value).toEqual(['value 1', 'value 2', 'value 3']);
  });

  it('return an label of item', () => {
    const value = getValueByKey(item, 'label');
    expect(value).toEqual([{ value: 'Distributors' }]);
  });

  it('return an ctaLink of item', () => {
    const value = getValueByKey(item, 'ctaLink');
    expect(value).toEqual([
      {
        value: {
          href: 'https://honda.ca',
          text: 'Distributors',
          linktype: 'external',
          url: 'https://honda.ca',
          anchor: '',
          target: '_blank',
        },
      },
    ]);
  });

  it('return an all label of items', () => {
    const value = getValueByKey(items, 'label');
    expect(value).toEqual([{ value: 'Distributors' }, { value: 'Distributors' }, { value: 'Distributors' }]);
  });
});
