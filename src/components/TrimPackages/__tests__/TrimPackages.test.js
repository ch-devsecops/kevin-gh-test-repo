import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup, fireEvent, within } from 'test-utils';
import PackagesGrid from '../PackageSelector/PackagesGrid';

window.scrollTo = jest.fn();

jest.mock('../../OffersProvider', () => ({
  __esModule: true,
  A: true,
  default: ({ children }) => (children ? children({ hasOffers: true }) : null),
}));

jest.mock('../../../utils/hooks/useProductFinancial', () => {
  const originalModule = jest.requireActual('../../../utils/hooks/useProductFinancial');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      financial: [],
      setModels: () => null,
      isFetching: false,
      hasError: false,
    }),
  };
});

afterEach(cleanup);

const trims = [
  { name: 'Trim-1', trimKey: 'trimKey' },
  { name: 'Trim-2', trimKey: 'trimKey2' },
];

const mockSelectTrim = jest.fn();

describe('<PackagesGrid>', () => {
  const renderMock = (selectedTrim, trimsParams = trims) =>
    jssRender(
      <PackagesGrid
        trims={trimsParams}
        setSelectedTrim={mockSelectTrim}
        selectedTrim={selectedTrim}
        modelKey="modelKey"
        modelYear="2021"
        language="en"
        isOpen={false}
        setIsOpen={jest.fn()}
      />,
    );

  it('should NOT close dropdown content when trim is not selected', () => {
    const { getByTestId } = renderMock();

    const dropdownButton = getByTestId('selectTrim');
    const contentBox = getByTestId('list');

    // closed on load, until useEffect has checked the querystring param
    expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
    expect(contentBox).toHaveStyleRule('max-height', '0');
  });

  it('should close dropdown when trim is selected', () => {
    const { getAllByRole, getByTestId } = renderMock();

    const dropdown = getByTestId('selectTrim');
    const buttons = getAllByRole('listitem');
    const trim = buttons[1]; // the clickable trim column (1 is the "not sure which trim" button)
    const contentBox = getByTestId('list');

    fireEvent.click(trim);

    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
    expect(contentBox).toHaveStyleRule('max-height', '0');
  });

  it('dropdown content should be closed on load, and show a title if a trim is selected', () => {
    const { getByTestId, container } = renderMock(trims[0]);

    const dropdown = getByTestId('selectTrim'); // the Select Trim button
    const contentBox = getByTestId('list');
    const header = container.querySelector('header');
    const title = within(header).getAllByText('Trim-1')[0];

    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
    expect(contentBox).toHaveStyleRule('max-height', '0');
    expect(title).toBeInTheDocument();
  });

  it('should not render a select dropdown if there is only one trim', () => {
    const { queryByText } = renderMock(null, [trims[0]]);

    const dropdown = queryByText('Pages.Models.Exploration.selectTrimDropdownLabel');

    expect(dropdown).not.toBeInTheDocument();
  });
});
