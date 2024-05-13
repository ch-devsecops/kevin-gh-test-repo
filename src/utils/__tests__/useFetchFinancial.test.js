import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { UserLocationContext } from '@honda-canada/user-location';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import useFetchFinancial from '../../utils/hooks/useFetchFinancial';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';
import { HONDA_SITE_NAME } from '../constants';

const mockSitecoreContext = sitecoreContext[HONDA_SITE_NAME.toLowerCase()];

// TODO: Mock fetch and server response

describe('useFetchFinancial', () => {
  const wrapper = ({ children }) => (
    <SitecoreContext context={mockSitecoreContext} componentFactory={{}}>
      <UserLocationContext.Provider value={{ provinceCode: 'ON', isFetchingUserLocation: false }}>
        {children}
      </UserLocationContext.Provider>
    </SitecoreContext>
  );
  it('should expose a function', () => {
    expect(useFetchFinancial).toBeDefined();
  });

  it('useFetchFinancial should return expected output', () => {
    const { result } = renderHook(
      () =>
        useFetchFinancial({
          models: [
            {
              modelKey: 'civic_sedan',
              modelYear: '2023',
            },
          ],
        }),
      { wrapper },
    );
    expect(result.current.data).toBeNull();
  });
});
