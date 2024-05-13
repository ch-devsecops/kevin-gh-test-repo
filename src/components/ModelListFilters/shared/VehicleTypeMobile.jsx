import React from 'react';
import { useTranslation } from 'react-i18next';

import FilterToggleContainer from '../FilterToggleContainer';
import VehicleTypeNavItem from './VehicleTypeNavItem';

const VehicleTypeMobile = ({
  expandedCategories,
  filterContainerWidth,
  setExpandedCategories,
  toggleContainerWidth,
  vehicleTypeList,
}) => {
  const { t } = useTranslation();

  return (
    <FilterToggleContainer
      hasSelections
      toggleContainerWidth={toggleContainerWidth}
      heading={t('Pages.Models.Exploration.filterVehicleType')}
      expanded={expandedCategories?.includes('vehicle-type')}
      setExpanded={isExpanded => {
        const expandedArray = isExpanded
          ? [...new Set([...expandedCategories, 'vehicle-type'])]
          : expandedCategories?.filter(cat => cat !== 'vehicle-type');
        setExpandedCategories(expandedArray);
      }}
    >
      <VehicleTypeNavItem vehicleTypeList={vehicleTypeList} filterContainerWidth={filterContainerWidth} />
    </FilterToggleContainer>
  );
};

export default VehicleTypeMobile;
