import React from 'react';
import { jssRender, cleanup } from 'test-utils';
import ModelPageNav from '../index';

const mockData = require('./mockData.test.json');

afterEach(cleanup);

describe('<ModelPageNav>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<ModelPageNav fields={mockData.fields} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render as null without fields', () => {
    const { container } = jssRender(<ModelPageNav />);

    expect(container.firstChild).toBeNull();
  });
});
