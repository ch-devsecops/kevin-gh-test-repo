import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { jssRender, cleanup, axe } from 'test-utils';

import ModelCardWithTrims from '../index';
import { variant3 } from '../service/constants';
import { MARINE_SITE_NAME } from '../../../utils/constants';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/marine-category-with-products/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/marine-category-with-products/empty_en.json');

describe('Component MarineCategoryWithProducts as ModelCardWithTrims for Marine', () => {
  const sitecoreContextMock = { site: { name: MARINE_SITE_NAME } };

  test('should render correctly', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ModelCardWithTrims {...mockData} variant={variant3} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render correctly with empty mock data', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ModelCardWithTrims {...emptyMockData} variant={variant3} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
  });

  test('should return null if there is no  fields', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ModelCardWithTrims fields={null} variant={variant3} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ModelCardWithTrims {...mockData} variant={variant3} />
      </SitecoreContext>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
