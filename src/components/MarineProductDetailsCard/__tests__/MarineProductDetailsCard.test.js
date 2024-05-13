import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import MarineProductDetailsCard from '..';
import { MARINE_SITE_NAME } from '../../../utils/constants';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/marine-product-details-card/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/marine-product-details-card/empty.json');

const sitecoreContextMock = { site: { name: MARINE_SITE_NAME } };

describe('<MarineProductDetailsCard>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <MarineProductDetailsCard {...mockData} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render correctly with empty mock data', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <MarineProductDetailsCard {...emptyMockData} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeUndefined();
  });

  test('should return nulll if there is no fields', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <MarineProductDetailsCard fields={null} />
      </SitecoreContext>,
    );
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <MarineProductDetailsCard {...mockData} />
      </SitecoreContext>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
