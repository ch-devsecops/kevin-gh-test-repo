import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup, screen } from 'test-utils';
import { jssFields } from '../mockData';
import { CompareTrimsJSS } from '../index';

const { trims, defaultTrim } = jssFields.data.value.modelYear.fields;
const mockSpecifications = trims.map(trim => ({
  trimId: parseInt(trim.detIdentifier.value, 10),
  label: 'ENGINE',
  specs: [
    {
      label: 'My label',
      value: 'My value',
    },
  ],
}));

jest.mock('../../../utils/hooks/useProductFinancial', () => {
  const originalModule = jest.requireActual('../../../utils/hooks/useProductFinancial');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      financial: [],
      setModels: () => null,
      isFetching: false,
      hasError: false,
    }),
  };
});

jest.mock('../../SpecificationsProvider', () => ({
  __esModule: true,
  A: true,
  default: ({ children }) => (children ? children({ specifications: mockSpecifications }) : null),
}));

jest.mock('../../../apiHooks', () => ({
  useTrimPayment: () => ({
    payment: {
      amount: 999,
    },
    isFetching: false,
  }),
}));

jest.mock('../PrintComparison', () => ({
  __esModule: true,
  A: true,
  // eslint-disable-next-line react/jsx-no-useless-fragment
  default: () => <></>,
}));

afterEach(cleanup);

describe('<CompareTrimsJSS>', () => {
  it('Should render specifications label and a value for each trim', () => {
    jssRender(
      <CompareTrimsJSS
        fields={jssFields}
        sitecoreContext={{
          language: 'en',
          provinces: [{ name: 'ON', provinceCode: 'ON', showMsrpAndSellingPrice: false }],
        }}
      />,
    );

    const label = screen.getAllByText('My label');
    const value = screen.getAllByText('My value');

    expect(label).toHaveLength(1);
    expect(value).toHaveLength(2);
  });

  it('Should render a build CTA for any trim with a buildable default transmission', () => {
    jssRender(
      <CompareTrimsJSS
        fields={jssFields}
        sitecoreContext={{
          language: 'en',
          provinces: [{ name: 'ON', provinceCode: 'ON', showMsrpAndSellingPrice: false }],
        }}
      />,
    );

    const label = screen.getAllByText('Shared.CompareTrims.buildThisTrimLabel');

    expect(label).toHaveLength(1);
  });

  it('Should render primaryTrim and secondaryTrim Sitecore fields', () => {
    jssRender(
      <CompareTrimsJSS
        fields={{
          ...jssFields,
          data: {
            ...jssFields.data,
            value: {
              ...jssFields.data.value,
              primaryTrim: {
                fields: {
                  detIdentifier: {
                    value: '10261',
                  },
                },
              },
              secondaryTrim: {
                fields: {
                  detIdentifier: {
                    value: '10262',
                  },
                },
              },
            },
          },
        }}
        sitecoreContext={{
          language: 'en',
          provinces: [{ name: 'ON', provinceCode: 'ON', showMsrpAndSellingPrice: false }],
        }}
      />,
    );

    const primaryTrim = screen.getByText('A-SPEC');
    const secondaryTrim = screen.getByText('Platinum Elite');
    const otherTrim = screen.queryByText('MDX');

    expect(primaryTrim).toBeInTheDocument();
    expect(secondaryTrim).toBeInTheDocument();
    expect(otherTrim).not.toBeInTheDocument();
  });

  it('If primaryTrim and secondaryTrim are the same, use the defaultTrim as the secondaryTrim', () => {
    jssRender(
      <CompareTrimsJSS
        fields={{
          ...jssFields,
          data: {
            ...jssFields.data,
            value: {
              ...jssFields.data.value,
              primaryTrim: {
                fields: {
                  detIdentifier: {
                    value: '10260',
                  },
                },
              },
              secondaryTrim: {
                fields: {
                  detIdentifier: {
                    value: '10260',
                  },
                },
              },
            },
          },
        }}
        sitecoreContext={{
          language: 'en',
          provinces: [{ name: 'ON', provinceCode: 'ON', showMsrpAndSellingPrice: false }],
        }}
      />,
    );
    const defaultTrimObject = trims.find(trim => trim.detIdentifier.value === defaultTrim.fields.detIdentifier.value);
    const secondaryTrim = screen.getByText(defaultTrimObject.trimName.value);

    expect(secondaryTrim).toBeInTheDocument();
  });

  it('If primaryTrim, secondaryTrim and defaultTrim are all the same, use the next trim', () => {
    jssRender(
      <CompareTrimsJSS
        fields={{
          ...jssFields,
          data: {
            ...jssFields.data,
            value: {
              ...jssFields.data.value,
              primaryTrim: {
                fields: {
                  detIdentifier: {
                    value: '10259',
                  },
                },
              },
              secondaryTrim: {
                fields: {
                  detIdentifier: {
                    value: '10259',
                  },
                },
              },
            },
          },
        }}
        sitecoreContext={{
          language: 'en',
          provinces: [{ name: 'ON', provinceCode: 'ON', showMsrpAndSellingPrice: false }],
        }}
      />,
    );
    const nextTrimName = trims[1].trimName.value;
    const nextTrim = screen.getByText(nextTrimName);

    expect(nextTrim).toBeInTheDocument();
  });

  it('Should override the primaryTrim field with a trim in the querystring, if present', () => {
    window.history.pushState({}, '', '/test.html?compare=10262');
    jssRender(
      <CompareTrimsJSS
        fields={{
          ...jssFields,
          data: {
            ...jssFields.data,
            value: {
              ...jssFields.data.value,
              primaryTrim: {
                fields: {
                  detIdentifier: {
                    value: '10259',
                  },
                },
              },
              secondaryTrim: {
                fields: {
                  detIdentifier: {
                    value: '10260',
                  },
                },
              },
            },
          },
        }}
        sitecoreContext={{
          language: 'en',
          provinces: [{ name: 'ON', provinceCode: 'ON', showMsrpAndSellingPrice: false }],
        }}
      />,
    );
    const querystringTrim = screen.getByText('Platinum Elite');

    expect(querystringTrim).toBeInTheDocument();
  });
});
