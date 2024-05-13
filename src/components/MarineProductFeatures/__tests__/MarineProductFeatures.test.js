import React from 'react';
import { jssRender, cleanup } from 'test-utils';
import MarineProductFeatures from '../index';
import sitecoreContext from '../../../sitecoreContextMocks/sitecoreContext';
import mockTextFeatures from './__mocks__/textFeature.json';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/engine-features/en.json');
const mockEmptyData = require('./__mocks__/empty_en.json');

jest.mock('../../ProductFeaturesProvider', () => ({
  __esModule: true,
  A: true,
  default: ({ children }) => (children ? children({ features: mockTextFeatures }) : null),
}));

describe('<MarineProductFeatures>', () => {
  test('should render correctly', () => {
    if (!''.matchAll) {
      // this is for jenkins while running node < 12.0
      expect(true).toBe(true);
      return;
    }

    const { queryByText } = jssRender(<MarineProductFeatures fields={mockData} />, {
      context: { sitecoreContext },
    });

    const value = queryByText('Four-Stroke Engine Design');

    expect(value).toBeInTheDocument();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<MarineProductFeatures fields={null} />, { context: { sitecoreContext } });

    expect(container).toMatchSnapshot();
  });

  test('should render even if there are empty fields', () => {
    const { container } = jssRender(<MarineProductFeatures fields={mockEmptyData} />, {
      context: { sitecoreContext },
    });

    expect(container).toMatchSnapshot();
  });
});
