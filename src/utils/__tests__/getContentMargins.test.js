import getContentMargins from '../getContentMargins';
import { params } from '../__mocks__/getContentMargins.mock';

describe('getContentMargins', () => {
  it('returns an object of valid css margin values', () => {
    const value = getContentMargins(params);
    expect(value).toEqual({
      innerTopMargin: '-64px',
      innerBottomMargin: '-48px',
      innerHorzMargin: '16px',
      innerTopMarginMob: '16px',
      innerBottomMarginMob: '0px',
      innerHorzMarginMob: '16px',
    });
  });
});
