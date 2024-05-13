import 'jest-styled-components';
import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { axe, cleanup, jssRender } from 'test-utils';
import MainContainer from '../MainContainer';
import { ENGINE_SITE_NAME } from '../../../utils/constants';
import mockData from '../../../../sample-mock-data/routes/engine-compare/en.json';
import emptyMockData from '../../../../sample-mock-data/routes/engine-compare/empty.json';

afterEach(cleanup);

const engineSeries = mockData?.fields?.data?.item?.series;
const sitecoreContextMock = {
  site: {
    name: ENGINE_SITE_NAME,
  },
  pageState: 'normal',
  hondaRestApiHost: 'uat-api.honda.ca',
};

describe.skip('<MainContainer>', () => {
  const renderMock = () =>
    jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <MainContainer engineSeries={engineSeries} />
      </SitecoreContext>,
    );

  it('should render without errors if there are no fields', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <MainContainer engineSeries={emptyMockData?.fields} />
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
