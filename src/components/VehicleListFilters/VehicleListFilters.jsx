import React, { useContext, useEffect } from 'react';
import { Media } from '@honda-canada/design-system-react';
import FiltersListDesktop from './shared/FiltersListDesktop';
import FiltersListMobile from './shared/FiltersListMobile';
import ConfigurationProvider from './service/Provider';
import inventoryVehicleListFilters from '../../core/reducers/inventoryVehicleListFilters';

import Context from './service/Context';

const VehicleListFiltersUI = ({ fields, componentName }) => {
  const { filterOptionsList } = fields;
  const { params } = useContext(Context) || {};

  useEffect(() => {
    params?.injectedReducer?.(inventoryVehicleListFilters, 'inventoryVehicleListFilters');
  }, []);

  return (
    <div data-gtm-component-type={componentName}>
      <Media greaterThanOrEqual="desktop">
        <FiltersListDesktop filterOptionsList={filterOptionsList} />
      </Media>
      <Media lessThan="desktop">
        <FiltersListMobile filterOptionsList={filterOptionsList} />
      </Media>
    </div>
  );
};

const VehicleListFilters = ({ appNameConfig, ...restProps }) => (
  <ConfigurationProvider appNameConfig={appNameConfig}>
    <VehicleListFiltersUI {...restProps} />
  </ConfigurationProvider>
);

export default VehicleListFilters;
