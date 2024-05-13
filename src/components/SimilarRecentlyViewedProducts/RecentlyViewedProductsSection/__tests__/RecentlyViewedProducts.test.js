import React from 'react';
import { axe, cleanup, jssRender, screen } from 'test-utils';
import RecentlyViewedProducts from '..';
import LocalStorageContext from '../../../LocalStorageContext/LocalStorageContext';
import getValueByKey from '../../../../utils/getValueByKey';
import { getEngineModels } from '../../utils';

afterEach(cleanup);

const mockData = require('../../../../../sample-mock-data/routes/recently-viewed/en.json');

const models = getValueByKey(mockData, 'series');

const localStorageStateMock = {
  recentlyViewedProducts: ['12101', '12099'],
  setRecentlyViewedProducts: () => {},
  toCompareProducts: [],
  setToCompareProducts: () => {},
  removeFromCompareProducts: () => {},
};

describe('<RecentlyViewedProducts>', () => {
  test('should render correctly', () => {
    jssRender(
      <LocalStorageContext.Provider value={localStorageStateMock}>
        <RecentlyViewedProducts models={models} getModels={getEngineModels} />
      </LocalStorageContext.Provider>,
    );

    expect(screen.queryByText('GX340')).toBeInTheDocument();
  });

  test('should not render when there is no item in the localstorage', () => {
    jssRender(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <LocalStorageContext.Provider value={{ ...localStorageStateMock, recentlyViewedProducts: [] }}>
        <RecentlyViewedProducts models={models} getModels={getEngineModels} />
      </LocalStorageContext.Provider>,
    );

    expect(screen.queryByText('GX340')).not.toBeInTheDocument();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<RecentlyViewedProducts models={null} getModels={getEngineModels} />);

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(
      <LocalStorageContext.Provider value={localStorageStateMock}>
        <RecentlyViewedProducts models={models} getModels={getEngineModels} />
      </LocalStorageContext.Provider>,
    );

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
