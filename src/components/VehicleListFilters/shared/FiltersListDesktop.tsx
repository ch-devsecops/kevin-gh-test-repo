import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, H5, Icon, IconWrapper, Copy } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

import FilterSection from './FiltersSection';
import {
  getIsSelectedFilterEmpty,
  setSelectedFilterItemsAction,
} from '../../../core/reducers/inventoryVehicleListFilters';

import themeStyles from '../VehicleListFilters.styles';
import type { FilterListProps } from '../service/types';

const FiltersWrapper = themeStyles.apply(Box, 'FiltersWrapper');
const HeaderWrapper = themeStyles.apply(Box, 'HeaderWrapper');
const DesktopResetFiltersButton = themeStyles.apply(Copy, 'DesktopResetFiltersButton');

const FiltersListDesktop = ({ filterOptionsList }: FilterListProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isSelectedFilterEmpty = useSelector(getIsSelectedFilterEmpty);

  const handlerResetAll = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(setSelectedFilterItemsAction([]));
  };

  return (
    <FiltersWrapper data-testid="cy-vehicle-list-filters">
      <HeaderWrapper>
        <H5 data-testid="cy-filters-header">{t('Pages.Models.Exploration.filterHeading')}</H5>
        <DesktopResetFiltersButton
          size="small"
          onClick={handlerResetAll}
          as="button"
          disabled={isSelectedFilterEmpty}
          data-testid="cy-filters-resetAll-button"
        >
          <IconWrapper>
            <Icon name="resetSpinner" iconColor={isSelectedFilterEmpty ? 'grey.0' : 'black'} />
          </IconWrapper>
          {t('Pages.Models.Exploration.filterResetLabel')}
        </DesktopResetFiltersButton>
      </HeaderWrapper>
      {filterOptionsList?.map(filterOption => (
        <FilterSection key={filterOption.key} filterOptions={filterOption} />
      ))}
    </FiltersWrapper>
  );
};

export default FiltersListDesktop;
