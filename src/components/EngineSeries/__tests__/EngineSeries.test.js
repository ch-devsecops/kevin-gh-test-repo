import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import EngineSeries from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/engine-series/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/engine-series/empty_en.json');
const emptyMargins = require('../../../../sample-mock-data/routes/engine-series/empty-margins.json');

describe('<EngineSeries>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<EngineSeries {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render with params', () => {
    const { container } = jssRender(<EngineSeries params={mockData?.params} fields={mockData} />);
    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render correctly with empty params', () => {
    const { container } = jssRender(<EngineSeries params={emptyMargins?.params} fields={mockData} />);
    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render correctly with empty mock data', () => {
    const { container } = jssRender(<EngineSeries {...emptyMockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return nulll if there is no  fields', () => {
    const { container } = jssRender(<EngineSeries fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<EngineSeries {...mockData} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
