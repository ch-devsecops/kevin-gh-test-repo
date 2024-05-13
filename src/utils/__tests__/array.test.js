import { getArrayValueByKey } from '../array';
import { varian1MockData } from '../../stories/Header/componentProps';

describe('getArrayValueByKey', () => {
  it('returns an array of fields items ctaIcon', () => {
    const value = getArrayValueByKey(varian1MockData.fields, 'ctaIcon');
    expect(value).toEqual([
      'arrowRight',
      'arrowRight',
      'arrowRight',
      'arrowRight',
      'arrowRight',
      'arrowRight',
      {
        editable: '<input id="fld" />',
        value: 'mapMarker',
      },
    ]);
  });

  it('returns an array of ctaIcon first line children, empty', () => {
    const value = getArrayValueByKey(varian1MockData.fields[0], 'ctaIcon');
    expect(value).toEqual([]);
  });
});
