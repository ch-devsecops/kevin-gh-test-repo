import React from 'react';
import { cleanup } from '@testing-library/react';
import { Image } from '@honda-canada/design-system-react';
import { jssRender } from 'test-utils';
import TrimCard from '..';

const props = {
  trim: {
    nameBadge: <Image alt="badge" src="https://via.placeholder.com/148x13" />,
    name: 'Trim Name',
  },
  image: <Image alt="alt" src="https://via.placeholder.com/300x200" />,
  priceComponent: <div>Price Component</div>,
  language: 'en',
  ctas: <a href="https://www.example.com">CTA</a>,
};

jest.mock('../../OffersProvider', () => ({
  __esModule: true,
  A: true,
  default: ({ children }) => (children ? children({ hasOffers: true }) : null),
}));

afterEach(cleanup);

describe('TrimCard snapshots', () => {
  it('renders with a price component', () => {
    const { container } = jssRender(<TrimCard {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('renders with no nameBadge', () => {
    const { container } = jssRender(<TrimCard {...props} nameBadge={undefined} />);

    expect(container).toMatchSnapshot();
  });

  it('renders selected', () => {
    const { container } = jssRender(<TrimCard {...props} selected />);

    expect(container).toMatchSnapshot();
  });

  it('renders with the provided cursor', () => {
    const { container } = jssRender(<TrimCard {...props} cursor="pointer" />);

    expect(container).toMatchSnapshot();
  });

  it('renders with a price object', () => {
    const { container } = jssRender(
      <TrimCard
        {...props}
        trim={{
          ...props.trim,
          pricing: {
            sellingPrice: 123,
            msrp: 1234,
          },
        }}
        priceComponent={null}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with a selling price province', () => {
    const { container } = jssRender(
      <TrimCard
        {...props}
        trim={{
          ...props.trim,
          pricing: {
            sellingPrice: 123,
            msrp: 1234,
          },
          isSellingPriceProvince: true,
        }}
        priceComponent={null}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with pricing that is fetching', () => {
    const { container } = jssRender(
      <TrimCard
        {...props}
        trim={{
          ...props.trim,
          pricing: {
            isFetching: true,
          },
        }}
        priceComponent={null}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with a pricing error', () => {
    const { container } = jssRender(
      <TrimCard
        {...props}
        trim={{
          ...props.trim,
          pricing: {
            hasError: true,
          },
        }}
        priceComponent={null}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with emissions values', () => {
    const { container } = jssRender(<TrimCard {...props} rating="162 g/km CO2" segmentAverage="172 g/km CO2" />);

    expect(container).toMatchSnapshot();
  });

  it('renders with a link to a details page', () => {
    const { container } = jssRender(
      <TrimCard
        {...props}
        trim={{
          ...props.trim,
          detailsPath: '/details',
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
