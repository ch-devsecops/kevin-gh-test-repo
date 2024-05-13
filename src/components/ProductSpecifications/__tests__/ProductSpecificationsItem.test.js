import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import ProductSpecificationsItem from '../ProductSpecificationsItem';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/product-specifications/en.json');
const mockEmptyData = require('../../../../sample-mock-data/routes/product-specifications/en.json');

describe('<ProductSpecificationsItem>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<ProductSpecificationsItem specs={mockData.fields.Specs} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<ProductSpecificationsItem specs={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should render even if there are empty fields', () => {
    const { container } = jssRender(<ProductSpecificationsItem specs={mockEmptyData.fields.Specs} />);

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<ProductSpecificationsItem specs={mockData.fields.Specs} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
