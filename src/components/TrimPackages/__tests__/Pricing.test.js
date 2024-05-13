import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup } from 'test-utils';
import Pricing from '../Details/Pricing';

jest.mock('../../../apiHooks', () => ({
  useTrimPayment: () => ({
    payment: {
      amount: 999,
      informationalApr: '99%',
      termByMonth: '60 @ 5.45%',
      termLabel: 'Weekly Lease',
    },
    isFetching: false,
  }),
}));

const transmissionsMock = [
  {
    detKey: { value: '10770-CVT' },
    detIdentifier: { value: '10770' },
    transmissionName: { value: 'CVT' },
    modelCode: { value: 'FL2H5NE' },
    isBuildable: { value: '1' },
    isComparable: { value: '1' },
  },
  {
    detKey: { value: '10769-Manual' },
    detIdentifier: { value: '10769' },
    transmissionName: { value: 'Manual' },
    modelCode: { value: 'FL2G5NE' },
    isBuildable: { value: '1' },
    isComparable: { value: '1' },
  },
];

afterEach(cleanup);

const pricing = {
  msrp: 5000,
  sellingPrice: 5001,
  freightPdiCost: 19,
  levyTotal: 1.5,
};

const getPaymentOptions = (paymentMethod, paymentFrequency) => ({
  paymentMethod,
  paymentFrequency,
});

describe('<Pricing>', () => {
  const renderMock = (paymentOptions, sitecoreContext) =>
    jssRender(
      <Pricing
        trimName="trim"
        pricing={pricing}
        transmissions={transmissionsMock}
        language="en"
        isDark="false"
        paymentOptions={paymentOptions}
      />,
      { context: { sitecoreContext } },
    );

  it('Renders sellingPrice and msrp when province is selling price province i.e. QC and no payment options', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'current-geo={"geo":{"province":{"abbreviation":"QC"}}}',
    });

    const sitecoreContext = {
      provinces: [{ name: 'QC', provinceCode: 'QC', showMsrpPrice: true, showSellingPrice: true }],
    };
    const paymentOptions = getPaymentOptions('', '');
    const { getAllByTestId } = renderMock(paymentOptions, sitecoreContext);

    const content = getAllByTestId('cy-pricing-price');
    expect(content[0]).toBeInTheDocument();
    expect(content[1]).toBeInTheDocument();
  });

  it('Renders sellingPrice when province is sellingPriceProvince i.e. QC and payment options are set', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'current-geo={"geo":{"province":{"abbreviation":"QC"}}}',
    });

    const sitecoreContext = {
      provinces: [{ name: 'QC', provinceCode: 'QC', showMsrpPrice: true, showSellingPrice: true }],
    };
    const paymentOptions = getPaymentOptions('finance', 'weekly');
    const { getAllByTestId } = renderMock(paymentOptions, sitecoreContext);

    const content = getAllByTestId('cy-pricing-price');
    expect(content[1]).toBeInTheDocument();
  });
});
