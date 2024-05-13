import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import Image from '../index';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/image/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/image/empty_en.json');

describe('<Image>', () => {
  it('should render correctly', () => {
    const { container } = jssRender(<Image {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  it('should render with no errors when fields and params props has empty values', () => {
    const { container } = jssRender(<Image {...emptyMockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    const { container } = jssRender(<Image {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
