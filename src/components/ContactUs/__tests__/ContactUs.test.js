import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import ContactUs from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/contactus/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/contactus/empty_en.json');

describe('<ContactUs>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<ContactUs {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<ContactUs fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should return null if the data is empty', () => {
    const { container } = jssRender(<ContactUs {...emptyMockData} />);
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<ContactUs {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
