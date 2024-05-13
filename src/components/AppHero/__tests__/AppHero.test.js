import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import AppHero from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/app-hero/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/app-hero/empty_en.json');
const mockEmptyValues = require('../../../../sample-mock-data/routes/app-hero/empty_values_en.json');

describe('<AppHero>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<AppHero {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<AppHero fields={null} />);

    expect(container).toMatchSnapshot();
  });
  test('should return null if the data values are empty', () => {
    const { container } = jssRender(<AppHero {...mockEmptyValues} />);

    expect(container).toMatchSnapshot();
  });

  test('should return null if the data is empty', () => {
    const { container } = jssRender(<AppHero {...emptyMockData} />);
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<AppHero {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
