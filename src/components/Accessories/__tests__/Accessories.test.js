import React from 'react';
import 'jest-styled-components';
import { cleanup } from '@testing-library/react';
import { jssRender, axe } from 'test-utils';
import Accessories from '../Accessories';
import {
  accessoriesApiMock,
  formatAccessoriesGenericCategoryMock,
  formatAccessoriesMock,
} from '../__mocks__/pspMockData';
import {
  pspEmptyFieldsData,
  pspEmptyFieldsData2,
  pspEmptyFieldsData3,
  pspMappedConverted,
  pspMappedData,
  pspOriginalData,
} from '../__mocks__/pspFieldsMockData';
import { mapPSPFields, formatAccessories, formatAccessoriesGenericCategory } from '../service/utils';
import { variant1, variant2 } from '../service/constants';
import sitecoreContext from '../../../sitecoreContextMocks/sitecoreContext';
import { createObjectFromProps } from '../../../utils/object';
import { acuraMappedConverted } from '../__mocks__/acuraFieldsMockData';
import acuraMockAccessoriesProviderData from '../__mocks__/acuraMockAccessoriesProviderData';
import pspMockAccessoriesProviderData from '../__mocks__/pspMockAccessoriesProviderData';
import camelcaseKeys from 'camelcase-keys';

const mockDataAcura = formatAccessories(camelcaseKeys(acuraMockAccessoriesProviderData, { deep: 'true' }));
const mockDataPSP = formatAccessoriesGenericCategory(camelcaseKeys(pspMockAccessoriesProviderData, { deep: 'true' }));

afterEach(cleanup);
let mockAccessories = mockDataAcura;
jest.mock('../service/useAccessoriesFetch', () => {
  const originalModule = jest.requireActual('../service/useAccessoriesFetch');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      accessories: mockAccessories,
      accessoriesLength: 1,
      isFetching: false,
      hasError: false,
    }),
  };
});

describe('Accessories utils testing', () => {
  it('Function formatAccessories', () => {
    const value = formatAccessories(accessoriesApiMock);
    expect(value).toEqual(formatAccessoriesMock);
  });
  it('Function formatAccessoriesGenericCategory', () => {
    const value = formatAccessoriesGenericCategory(accessoriesApiMock);
    expect(value).toEqual(formatAccessoriesGenericCategoryMock);
  });
  it('Function mapPSPFields positive', () => {
    const value = mapPSPFields(pspOriginalData.data.value);
    expect(value).toEqual(pspMappedData);
  });
  it('Function mapPSPFields negative empty object', () => {
    const value = mapPSPFields({});
    expect(value).toEqual({});
  });
  it('Function mapPSPFields negative NUll', () => {
    const value = mapPSPFields(null);
    expect(value).toEqual({});
  });
  it('Function mapPSPFields empty fields', () => {
    const value = mapPSPFields(pspEmptyFieldsData);
    expect(value).toEqual(pspEmptyFieldsData);
  });
  it('Function mapPSPFields empty fields and empty modelYear.fields', () => {
    const value = mapPSPFields(pspEmptyFieldsData2);
    expect(value).toEqual({
      ...pspEmptyFieldsData2,
      modelYear: {
        fields: {
          defaultTrim: {
            fields: undefined,
          },
          model: {
            detKey: {
              value: undefined,
            },
          },
          trims: undefined,
        },
      },
    });
  });
  it('Function mapPSPFields empty fields and w/o modelYear', () => {
    const value = mapPSPFields(pspEmptyFieldsData3);
    expect(value).toEqual({});
  });
  it('Function mapPSPFields after createObjectFromProps', () => {
    const value = createObjectFromProps(pspMappedData);
    expect(value).toEqual(pspMappedConverted);
  });
});

describe('Accessories snapshots Acura', () => {
  it('renders component w/o Mapper', () => {
    jest.mock('../service/useAccessoriesFetch', () => ({
      __esModule: true,
      A: true,
      default: () => ({ accessories: [], isFetching: false }),
    }));

    const { container } = jssRender(
      <Accessories fields={acuraMappedConverted} componentName={'Accessories'} variant={variant1} />,
      { context: { sitecoreContext: sitecoreContext.acura } },
    );

    expect(container).toMatchSnapshot();
  });
});

describe('Accessories snapshots PSP', () => {
  beforeEach(() => {
    mockAccessories = mockDataPSP;
  });

  it('renders component w/o Mapper', () => {
    const { container } = jssRender(
      <Accessories
        fields={pspMappedConverted}
        componentName={'Accessories'}
        variant={variant2}
        vehicleType={'ON-ROAD'}
      />,
      { context: { sitecoreContext: sitecoreContext.psp } },
    );

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(
      <Accessories
        fields={pspMappedConverted}
        componentName={'Accessories'}
        variant={variant2}
        vehicleType={'ON-ROAD'}
      />,
      {
        context: { sitecoreContext: sitecoreContext.psp },
      },
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
