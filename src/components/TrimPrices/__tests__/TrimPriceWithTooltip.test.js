import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import TrimPriceWithTooltip from '../TrimPriceWithTooltip';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/trim-price-with-tooltip/en.json');

describe('<TrimPriceWithTooltip>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<TrimPriceWithTooltip {...mockData} data-testid="msrp-content" />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('it should have no accessibility violations', async () => {
    const { container } = jssRender(<TrimPriceWithTooltip {...mockData} data-testid="msrp-content" />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
