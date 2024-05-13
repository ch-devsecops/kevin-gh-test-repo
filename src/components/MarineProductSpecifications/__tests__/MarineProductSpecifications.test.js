import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import sitecoreContext from '../../../sitecoreContextMocks/sitecoreContext';
import MarineProductSpecifications from '../index';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/marine-product-specifications/en.json');
const mockEmptyData = require('../../../../sample-mock-data/routes/marine-product-specifications/empty_en.json');

const mockSpecifications = [
  {
    TrimId: parseInt(mockData.fields.data.value.model.fields.detIdentifier.value, 10),
    DisplayOrder: 1,
    label: 'SPECIFICATIONS',
    name: 'specifications',
    specs: [
      {
        displayOrder: 1,
        label: 'Engine Type',
        name: 'engine_type',
        tip: '',
        value: 'Air-cooled 4-stroke OHC',
      },
      {
        displayOrder: 2,
        label: 'Bore x Stroke',
        name: 'bore_x_stroke',
        tip: '',
        value: '56 mm x 40 mm',
      },
    ],
  },
];

jest.mock('../../SpecificationsProvider', () => ({
  __esModule: true,
  A: true,
  default: ({ children }) => (children ? children({ specifications: mockSpecifications }) : null),
}));

describe('<MarineProductSpecifications>', () => {
  test('should render correctly', () => {
    const { queryByText } = jssRender(<MarineProductSpecifications fields={mockData} />, {
      context: { sitecoreContext },
    });

    const value = queryByText('Air-cooled 4-stroke OHC');

    expect(value).toBeInTheDocument();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<MarineProductSpecifications fields={null} />, { context: { sitecoreContext } });

    expect(container).toMatchSnapshot();
  });

  test('should render even if there are empty fields', () => {
    const { container } = jssRender(<MarineProductSpecifications fields={mockEmptyData} />, {
      context: { sitecoreContext },
    });

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<MarineProductSpecifications {...mockData} />, { context: { sitecoreContext } });

    expect(await axe(container)).toHaveNoViolations();
  });
});
