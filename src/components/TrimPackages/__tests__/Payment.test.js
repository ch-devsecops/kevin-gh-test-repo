import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup, screen, fireEvent } from 'test-utils';
import Payment from '../Details/Payment';

jest.mock('../../../apiHooks', () => ({
  useTrimPayment: () => ({
    payment: {
      amount: '$33.3',
      termLabel: 'Weekly Financing',
      informationalApr: '5.5%',
      termByMonth: '60 @ 4.19%',
    },
    isFetching: false,
  }),
}));

afterEach(cleanup);

const pricing = {
  msrp: 5000,
  sellingPrice: 5001,
  freightPdiCost: 19,
  levyTotal: 1.5,
};

const getTrim = (provinceKey, isSellingPriceProvince, paymentOptions) => ({
  name: 'trim name',
  modelKey: 'modelKey',
  modelYear: 2022,
  trimKey: 'trimKey',
  transmissionKey: 'transmissionKey',
  provinceKey,
  isSellingPriceProvince,
  paymentOptions,
  pricing,
  exteriorColorKey: 'exteriorColorKey',
});

describe('<Payment>', () => {
  it('renders if payment options are set', () => {
    const sitecoreContext = { provinces: [{ name: 'QC', provinceCode: 'QC', showMsrpAndSellingPrice: true }] };
    const paymentOptions = {
      paymentMethod: 'finance',
      paymentFrequency: 'weekly',
    };
    // showSellingPrice is true
    const trim = getTrim('QC', true, paymentOptions);
    jssRender(
      <Payment
        trim={trim}
        language="en"
        isDark="false"
        paymentOptions={paymentOptions}
        showInformationalApr
        appName="honda"
      />,
      { context: { sitecoreContext } },
    );

    expect(screen.getByText('$33.3')).toBeInTheDocument();
    expect(screen.getByText('60 @ 4.19%')).toBeInTheDocument();
    expect(screen.queryByText('Shared.Common.termByMonthLabel')).toBeInTheDocument();
    expect(screen.queryByText('Weekly Financing')).toBeInTheDocument();
    expect(screen.queryByText('Shared.Common.informationalAprLabel')).toBeInTheDocument();
  });

  it('renders informational apr', () => {
    const sitecoreContext = { provinces: [{ name: 'QC', provinceCode: 'QC', showMsrpAndSellingPrice: false }] };
    const paymentOptions = {
      paymentMethod: 'finance',
      paymentFrequency: 'weekly',
    };
    // showSellingPrice is true
    const trim = getTrim('QC', true, paymentOptions);
    const { getByTestId } = jssRender(
      <Payment
        trim={trim}
        language="en"
        isDark="false"
        paymentOptions={paymentOptions}
        showInformationalApr
        showPaymentInfoTooltip
        appName="honda"
      />,
      { context: { sitecoreContext } },
    );

    const iconModal = getByTestId('IconModal');
    expect(iconModal).toBeDefined();
    expect(screen.queryByText('Shared.Common.paymentTooltipLabel')).not.toBeInTheDocument();
    fireEvent.click(iconModal);
    expect(screen.queryByText('Shared.Common.paymentTooltipLabel')).toBeInTheDocument();
  });
});
