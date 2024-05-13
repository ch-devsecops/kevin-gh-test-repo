import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import MarineProductConfigurations from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/marine-product-configurations/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/marine-product-details-card/empty.json');

describe('<MarineProductConfigurations>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<MarineProductConfigurations {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render correctly with empty mock data', () => {
    const { container } = jssRender(<MarineProductConfigurations {...emptyMockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeUndefined();
  });

  test('should return nulll if there is no fields', () => {
    const { container } = jssRender(<MarineProductConfigurations fields={null} />);
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<MarineProductConfigurations {...mockData} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
