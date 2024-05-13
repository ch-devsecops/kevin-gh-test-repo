import 'jest-styled-components';
import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { axe, cleanup, jssRender } from 'test-utils';
import ProductSelector from '../ProductSelector';
import mockData from '../../../../sample-mock-data/routes/engine-compare/en.json';
import { ENGINE_SITE_NAME } from '../../../utils/constants';
import { getEngineMappedCatalogData } from '../../CompareProducts/utils';

const engineSeries = mockData?.fields?.data?.item?.series;

afterEach(cleanup);

const mockProps = {
  callback: jest.fn(),
  activeProducts: [],
  index: 0,
};

const sitecoreContextMock = {
  site: {
    name: ENGINE_SITE_NAME,
  },
  pageState: 'normal',
  hondaRestApiHost: 'uat-api.honda.ca',
};

describe('<ProductSelector>', () => {
  const catalogDataTree = getEngineMappedCatalogData(engineSeries);
  const renderMock = () =>
    jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ProductSelector
          productCatalogDataTree={catalogDataTree}
          selectorIndex={mockProps.index}
          activeProducts={mockProps.activeProducts}
          onProductSelected={mockProps.callback}
        />
      </SitecoreContext>,
    );

  it('should render without errors if there is no data', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ProductSelector />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderMock();

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders without errors', async () => {
    const { container } = renderMock();

    expect(container).toMatchSnapshot();
  });
});
