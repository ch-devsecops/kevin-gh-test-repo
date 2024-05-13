import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import PromoBanner from '../../index'

afterEach(cleanup);

const mockData = require('../../../../../sample-mock-data/routes/promo-banner/en.json');
const mockEmptyData = require('../../../../../sample-mock-data/routes/promo-banner/empty_en.json');

describe('<PromoBanner>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<PromoBanner fields={mockData.fields} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<PromoBanner fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should render even if there are empty fields', () => {
    const { container } = jssRender(<PromoBanner fields={mockEmptyData.fields} />);

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<PromoBanner fields={mockData.fields} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
