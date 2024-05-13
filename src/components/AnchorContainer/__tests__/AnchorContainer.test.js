import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import AnchorContainer from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/anchor-container/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/anchor-container/empty_en.json');

describe('<AnchorContainer>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<AnchorContainer rendering={mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<AnchorContainer fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should return null if the data is empty', () => {
    const { container } = jssRender(<AnchorContainer rendering={emptyMockData} />);
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<AnchorContainer rendering={mockData} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
