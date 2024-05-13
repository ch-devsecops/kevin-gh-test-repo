import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import MarineCategory from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/marine-series/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/marine-series/empty_en.json');

describe('<MarineSeries>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<MarineCategory {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render with params', () => {
    const { container } = jssRender(<MarineCategory params={mockData?.params} fields={mockData} />);
    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render correctly with empty mock data', () => {
    const { container } = jssRender(<MarineCategory {...emptyMockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return nulll if there is no  fields', () => {
    const { container } = jssRender(<MarineCategory fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<MarineCategory {...mockData} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
