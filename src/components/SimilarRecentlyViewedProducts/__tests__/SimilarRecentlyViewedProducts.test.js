import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import SimilarRecentlyViewedProducts from '..';
import { ENGINE_SITE_NAME } from '../../../utils/constants';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/similar-recently-viewed-products/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/similar-recently-viewed-products/empty_en.json');

const contextMock = {
  site: {
    name: 'Engine',
  },
  pageState: 'normal',
  hondaRestApiHost: 'uat-api.honda.ca',
};

describe('<SimilarRecentlyViewedProducts>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(
      <SitecoreContext
        context={{
          language: 'en',
          site: { name: ENGINE_SITE_NAME },
          ...contextMock,
        }}
        componentFactory={{}}
      >
        <SimilarRecentlyViewedProducts fields={mockData?.fields} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<SimilarRecentlyViewedProducts fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should return null if the data is empty', () => {
    const { container } = jssRender(
      <SitecoreContext
        context={{
          language: 'en',
          site: { name: ENGINE_SITE_NAME },
          ...contextMock,
        }}
        componentFactory={{}}
      >
        <SimilarRecentlyViewedProducts fields={emptyMockData?.fields} />
      </SitecoreContext>,
    );
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(
      <SitecoreContext
        context={{
          language: 'en',
          site: { name: ENGINE_SITE_NAME },
          ...contextMock,
        }}
        componentFactory={{}}
      >
        <SimilarRecentlyViewedProducts fields={mockData?.fields} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
