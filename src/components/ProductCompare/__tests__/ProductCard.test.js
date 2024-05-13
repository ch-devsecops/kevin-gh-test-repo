import 'jest-styled-components';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import ProductCard from '../ProductCard';
import { ENGINE_SITE_NAME, PSP_SITE_NAME } from '../../../utils/constants';

afterEach(cleanup);

const mockData = {
  product: {
    name: 'Product Title',
    thumbnail: {
      url: 'path-to-image',
      alt: 'alt-text',
      width: 100,
      height: 100,
    },
    modelPage: {
      url: 'someUrl',
    },
  },
  onRemoveOption: jest.fn(),
  productIndex: 0,
  isSticky: false,
  viewDetailsButton: 'Shared.Common.viewDetailsButton',
  gtmTags: {},
};

describe('<ProductCard>', () => {
  const renderMock = (siteName, mockData) => {
    const contextMock = {
      language: 'en',
      site: {
        name: siteName,
      },
      pageState: 'normal',
      hondaRestApiHost: 'uat-api.honda.ca',
    };
    return jssRender(
      <SitecoreContext context={contextMock}>
        <ProductCard {...mockData} />
      </SitecoreContext>,
    );
  };

  it('should render without errors if there is no data', () => {
    const { container } = renderMock(ENGINE_SITE_NAME, { viewDetailsButton: 'Shared.Common.viewDetailsButton' });

    expect(container).toMatchSnapshot();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderMock(ENGINE_SITE_NAME, mockData);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders without errors', async () => {
    const { container } = renderMock(ENGINE_SITE_NAME, mockData);

    expect(container).toMatchSnapshot();
  });
});
