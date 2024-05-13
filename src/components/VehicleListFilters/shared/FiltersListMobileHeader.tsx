import React from 'react';
import { Box, H5, Icon } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

import themeStyles from '../VehicleListFilters.styles';
import { type FiltersListMobile } from '../service/types';

const HeaderWrapper = themeStyles.apply(Box, 'HeaderWrapper');
const CloseButton = themeStyles.apply('button', 'CloseButton');
const CloseIcon = themeStyles.apply(Icon, 'CloseIcon');

const FiltersListMobileHeader = ({ setMobileFiltersOpen, isMobileFiltersOpen }: FiltersListMobile) => {
  const { t } = useTranslation();

  return (
    <HeaderWrapper>
      <H5 data-testid="cy-filters-header">{t('Pages.Models.Exploration.filterHeading')}</H5>
      <CloseButton type="button" onClick={() => setMobileFiltersOpen((prevState: boolean) => !prevState)}>
        <CloseIcon name={isMobileFiltersOpen ? 'close' : 'plus'} />
      </CloseButton>
    </HeaderWrapper>
  );
};

export default FiltersListMobileHeader;
