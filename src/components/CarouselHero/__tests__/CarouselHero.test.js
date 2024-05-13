import React from 'react';
import { cleanup, jssRender, axe } from 'test-utils';
import CarouselHero from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/carousel-hero/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/carousel-hero/empty_en.json');
const mockEmptyValues = require('../../../../sample-mock-data/routes/carousel-hero/empty_en.json');

describe('<CarouselHero>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<CarouselHero {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<CarouselHero fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should return null if the data is empty', () => {
    const { container } = jssRender(<CarouselHero {...emptyMockData} />);
    expect(container).toMatchSnapshot();
  });

  test('should return null if the data values are empty', () => {
    const { container } = jssRender(<CarouselHero {...mockEmptyValues} />);
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<CarouselHero {...mockData} />);
    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
