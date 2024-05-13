import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup } from 'test-utils';
import Fees from '../Details/Fees';

jest.mock('../../../apiHooks', () => ({
  useTrimPayment: () => ({
    payment: {
      preferredPaymentAmount: 33.3,
      informationalApr: 5.5,
      term: 60,
      apr: 4.19,
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

describe('<Fees>', () => {
  const renderMock = (trim, showSellingPrice) =>
    jssRender(
      <Fees
        pricing={trim.pricing}
        showSellingPrice={showSellingPrice}
        language="en"
        isDark="false"
      />,
    );

  it('Renders correct freight and pdi label when province is isSellingPrice and paymentOptions are set', () => {
    // showSellingPrice is true
    const { getByText } = renderMock(pricing, true, true);
    const label = getByText('Shared.Common.includesFreightsAndFeesLabel');
    expect(label).toBeInTheDocument();
  });

  it('Renders correct freight and pdi label when province is not isSellingPrice', () => {
    // showSellingPrice is false
    const { getByText } = renderMock(pricing, false, true);
    const label = getByText('Shared.Common.excludesFreightsAndFeesLabel');
    expect(label).toBeInTheDocument();
  });
});
