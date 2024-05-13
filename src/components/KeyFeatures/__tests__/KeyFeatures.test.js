import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import KeyFeatures from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/key-features/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/app-hero/empty_en.json');

describe('<KeyFeatures>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<KeyFeatures {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<KeyFeatures fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should return null if the data is empty', () => {
    const { container } = jssRender(<KeyFeatures {...emptyMockData} />);
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<KeyFeatures {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
