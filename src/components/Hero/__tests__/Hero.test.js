import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import Hero from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/hero/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/hero/empty_en.json');

describe('<Hero>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<Hero {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<Hero fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should return null if the data is empty', () => {
    const { container } = jssRender(<Hero {...emptyMockData} />);
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<Hero {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
