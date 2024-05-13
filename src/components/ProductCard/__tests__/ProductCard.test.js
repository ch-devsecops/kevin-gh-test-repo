import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import ProductCard from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/product-card/en.json');

describe('<ProductCard>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<ProductCard fields={mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<ProductCard fields={mockData} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
