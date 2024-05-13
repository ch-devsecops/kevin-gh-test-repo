import React from 'react';
import { Box, Optional, Media } from '@honda-canada/design-system-react';

import VehicleTypeMobile from './shared/VehicleTypeMobile';
import VehicleTypeDesktop from './shared/VehicleTypeDesktop';
import themeStyles from './modelListFilter.styles';

const VehicleTypeWrapper = themeStyles.apply(Box, 'VehicleTypeWrapper');

const VehicleType = ({
  expandedCategories,
  filterContainerWidth,
  headerWidth,
  setExpandedCategories,
  toggleContainerWidth,
  vehicleTypeList,
}) => (
  <Optional when={vehicleTypeList.length}>
    <VehicleTypeWrapper data-testid="cy-model-list-filter-vehicle-type">
      <Media lessThan="desktop">
        <VehicleTypeMobile
          expandedCategories={expandedCategories}
          filterContainerWidth={filterContainerWidth}
          setExpandedCategories={setExpandedCategories}
          toggleContainerWidth={toggleContainerWidth}
          vehicleTypeList={vehicleTypeList}
        />
      </Media>
      <Media greaterThan="smallDesktop">
        <VehicleTypeDesktop
          filterContainerWidth={filterContainerWidth}
          headerWidth={headerWidth}
          vehicleTypeList={vehicleTypeList}
        />
      </Media>
    </VehicleTypeWrapper>
  </Optional>
);

export default VehicleType;
