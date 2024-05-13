import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup, screen } from 'test-utils';
import { Image } from '@honda-canada/design-system-react';
import TrimCard from '..';

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

afterEach(cleanup);

const sitecoreContext = { provinces: [{ name: 'QC', provinceCode: 'QC', showMsrpAndSellingPrice: true }] };

const props = {
  trim: {
    nameBadge: <Image alt="badge" src="https://via.placeholder.com/148x13" />,
    name: 'Trim Name',
    modelKey: 'modelKey',
    modelYear: 2022,
    trimKey: 'trimKey',
    transmissionKey: 'transmissionKey',
    provinceKey: 'ON',
    isSellingPriceProvince: false,
    exteriorColorKey: 'exteriorColorKey',
    pricing: {
      hasError: false,
    }
  },
  paymentOptions: { paymentMethod: 'finance', paymentFrequency: 'weekly' },
  image: <Image alt="alt" src="https://via.placeholder.com/300x200" />,
  priceComponent: <div>Price Component</div>,
  language: 'en',
  ctas: <a href="https://www.example.com">CTA</a>,
};

describe('<TrimCard>', () => {
  it('renders payment content if payment options are set', () => {
    jssRender(<TrimCard {...props} />, { context: { sitecoreContext } });

    expect(screen.queryByText('Weekly Lease')).toBeInTheDocument();
    expect(screen.queryByText('999')).toBeInTheDocument();
    expect(screen.queryByText('Shared.Common.termByMonthLabel')).toBeInTheDocument();
    expect(screen.queryByText('60 @ 5.45%')).toBeInTheDocument();
  });

  it('does not render payment content if either payment option is falsy', () => {
    const paymentOptions = { paymentMethod: '', paymentFrequency: undefined };
    const subprops = {
      ...props,
      priceComponent: null,
      trim: {
        ...props.trim,
        pricing: {
          hasError: true,
        }
      }
    };
    jssRender(<TrimCard {...subprops} paymentOptions={paymentOptions} />, { context: { sitecoreContext } });
    expect(screen.queryByText('Weekly Lease')).not.toBeInTheDocument();
  });

  it('renders informational apr', () => {
    jssRender(<TrimCard {...props} showInformationalApr />, { context: { sitecoreContext } });

    expect(screen.queryByText('99%')).toBeInTheDocument();
  });
});
