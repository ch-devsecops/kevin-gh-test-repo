import { fireEvent } from '@testing-library/react';
import React from 'react';
import { axe, cleanup, jssRender, screen } from 'test-utils';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import CompareDrawer from '..';
import LocalStorageContext from '../../LocalStorageContext/LocalStorageContext';
import { ENGINE_SITE_NAME } from '../../../utils/constants';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/compare-drawer/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/compare-drawer/empty_en.json');

// todo: improve tests with localstorage mocking
// ref: https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/
const localStorageStateMock = {
  toCompareProducts: ['12095', '12096', '12097', '12098'],
  isCompareDrawerOpen: true,
  setToCompareProducts: jest.fn(),
  toggleCompareDrawer: jest.fn(),
  removeFromCompareProducts: jest.fn(),
  deleteToCompareProducts: jest.fn(),
};

const contextMock = {
  site: {
    name: 'Engine',
  },
  pageState: 'normal',
  hondaRestApiHost: 'uat-api.honda.ca',
};

describe('<CompareProductsDrawer>', () => {
  const renderMockCompare = () =>
    jssRender(
      <SitecoreContext
        context={{
          language: 'en',
          site: { name: ENGINE_SITE_NAME },
          ...contextMock,
        }}
        componentFactory={{}}
      >
        <LocalStorageContext.Provider value={localStorageStateMock}>
          <CompareDrawer {...mockData} />
        </LocalStorageContext.Provider>
      </SitecoreContext>,
    );

  it('should render correctly', () => {
    renderMockCompare();

    expect(screen.queryByText('GX120')).toBeInTheDocument();
  });

  test('should not render when there is no item in the localstorage', () => {
    jssRender(
      <SitecoreContext
        context={{
          language: 'en',
          site: { name: ENGINE_SITE_NAME },
          ...contextMock,
        }}
        componentFactory={{}}
      >
        <LocalStorageContext.Provider value={{ ...localStorageStateMock, toCompareProducts: [] }}>
          <CompareDrawer {...mockData} />
        </LocalStorageContext.Provider>
      </SitecoreContext>,
    );

    expect(screen.queryByText('GX120')).not.toBeInTheDocument();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(
      <SitecoreContext
        context={{
          language: 'en',
          site: { name: ENGINE_SITE_NAME },
          ...contextMock,
        }}
        componentFactory={{}}
      >
        <CompareDrawer fields={emptyMockData?.fields} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
  });

  test('should empty local storage when cleared', () => {
    const storageMock = { ...localStorageStateMock };
    const { getByTestId, container } = renderMockCompare();
    const clearBtn = getByTestId('clear-button');
    fireEvent.click(clearBtn);
    storageMock.toCompareProducts = [];
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = renderMockCompare();

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
