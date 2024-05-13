import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import { initialize } from '@googlemaps/jest-mocks';
import DistributorCard from '../index';

const mockData = require('../../../../sample-mock-data/routes/distributer-card/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/distributer-card/empty_en.json');

beforeEach(() => {
  initialize();
});

afterEach(cleanup);

describe('<DistributorCard>', () => {
  test('it should render correctly', () => {
    const { container } = jssRender(<DistributorCard fields={mockData.fields} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('it should render as null without fields', () => {
    const { container } = jssRender(<DistributorCard field={null} />);

    expect(container.firstChild).toBeNull();
  });

  test('it should render even if there are empty values', () => {
    const { container } = jssRender(<DistributorCard fields={emptyMockData.fields} />);

    expect(container).toMatchSnapshot();
    expect(container.children).toBeTruthy();
  });

  test('it should have no accessibility violations', async () => {
    const { container } = jssRender(<DistributorCard fields={mockData.fields} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
