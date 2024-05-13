import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, H6 } from '@honda-canada/design-system-react';

import themeStyles from '../modelListFilter.styles';
import VehicleTypeNavItem from './VehicleTypeNavItem';

const Header = themeStyles.apply(Box, 'Header');

const VehicleTypeDesktop = ({ vehicleTypeList, headerWidth, filterContainerWidth }) => {
  const { t } = useTranslation();

  return (
    <>
      <Header type="vehicle" headerWidth={headerWidth}>
        <H6>{t('Pages.Models.Exploration.filterVehicleType')}</H6>
      </Header>
      <VehicleTypeNavItem vehicleTypeList={vehicleTypeList} filterContainerWidth={filterContainerWidth} />
    </>
  );
};

export default VehicleTypeDesktop;
