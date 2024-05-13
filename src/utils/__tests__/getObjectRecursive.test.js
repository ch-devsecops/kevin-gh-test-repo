import getObjectRecursive from '../object/getObjectRecursive';
import { object, array } from '../__mocks__/getObjectRecursive.mock';

describe('getObjectRecursive', () => {
  it('extract child object from complex Object', () => {
    const value = getObjectRecursive(object, 'Key', '10596-Default');
    expect(value).toEqual([
      {
        Id: 10596,
        Key: '10596-Default',
        Msrp: 1249.0,
        LevyTotal: 0.0,
        ExteriorColors: [
          {
            Id: 21,
            Key: 'MarineDummy',
            MsrpMarkup: 0.0,
            Msrp: 1249.0,
            SellingPrice: 1407.0,
          },
        ],
      },
    ]);
  });
  it('extract childs (2) object from complex Object', () => {
    const value = getObjectRecursive(object, 'SellingPrice', '35249.0');
    expect(value).toEqual([
      {
        Id: 74,
        Key: 'MarineDummy',
        MsrpMarkup: 0.0,
        Msrp: 34749.0,
        SellingPrice: 35249.0,
      },
      {
        Id: 76,
        Key: 'MarineDummy',
        MsrpMarkup: 0.0,
        Msrp: 34749.0,
        SellingPrice: 35249.0,
      },
    ]);
  });
  it('extract child object from complex Array', () => {
    const value = getObjectRecursive(array, 'Id', 10593);
    expect(value).toEqual([
      {
        Id: 10593,
        Key: '10593-Default',
        Msrp: 4299.0,
        LevyTotal: 0.0,
        ExteriorColors: [
          {
            Id: 34,
            Key: 'MarineDummy',
            MsrpMarkup: 0.0,
            Msrp: 4299.0,
            SellingPrice: 4457.0,
          },
        ],
      },
    ]);
  });
});
