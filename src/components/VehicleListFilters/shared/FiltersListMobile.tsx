import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Icon, Modal, useThemeContext } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import Sticky from 'react-stickynode';

import FilterSection from './FiltersSection';
import FiltersListMobileHeader from './FiltersListMobileHeader';
import {
  getCurrentListType,
  getIsSelectedFilterEmpty,
  setSelectedFilterItemsAction,
} from '../../../core/reducers/inventoryVehicleListFilters';

import themeStyles from '../VehicleListFilters.styles';
import { type FilterListProps, CurrentListTypes } from '../service/types';

const MobileFiltersContainer = themeStyles.apply(Box, 'MobileFiltersContainer');
const FiltersWrapper = themeStyles.apply(Box, 'FiltersWrapper');
const ButtonsContainer = themeStyles.apply(Box, 'ButtonsContainer');
const ShadowBox = themeStyles.apply(Box, 'ShadowBox');
const ResetFiltersButton = themeStyles.apply(Button, 'ResetFiltersButton');
const PrimaryButton = themeStyles.apply(Button, 'PrimaryButton');

const STICKY_OFFSET = 100;
const BUTTON_CONTAINER_HEIGHT = 45;

const FiltersListMobile = ({ filterOptionsList }: FilterListProps) => {
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const isSelectedFilterEmpty = useSelector(getIsSelectedFilterEmpty);
  const currentListType = useSelector(getCurrentListType);
  const { header } = useThemeContext();

  // Sticky position = Header height + height of other components
  // If the "other components" requirement changes, we can update this
  const stickyPosition = parseInt(header?.mobile?.height || 0, 10) + STICKY_OFFSET;
  const handlerResetAll = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(setSelectedFilterItemsAction([]));
  };

  useEffect(() => {
    if (currentListType === CurrentListTypes.Trims) {
      setMobileFiltersOpen(false);
    }
  }, [currentListType]);

  const { t } = useTranslation();

  return (
    <>
      <Sticky top={stickyPosition}>
        <MobileFiltersContainer>
          <FiltersWrapper data-testid="cy-vehicle-list-filters">
            <FiltersListMobileHeader setMobileFiltersOpen={setMobileFiltersOpen} isMobileFiltersOpen={false} />
          </FiltersWrapper>
        </MobileFiltersContainer>
      </Sticky>
      <Modal
        isOpen={isMobileFiltersOpen}
        closeModal={() => setMobileFiltersOpen(false)}
        styling="fullOverlay"
        allowClose={false}
      >
        {() => (
          <>
            <FiltersWrapper data-testid="cy-vehicle-list-filters" pb={BUTTON_CONTAINER_HEIGHT}>
              <FiltersListMobileHeader setMobileFiltersOpen={setMobileFiltersOpen} isMobileFiltersOpen />
              {filterOptionsList?.map(filterOption => (
                <FilterSection key={filterOption.key} filterOptions={filterOption} />
              ))}
            </FiltersWrapper>
            <ButtonsContainer data-testid="cy-sticky-buttons-container">
              <ShadowBox>
                <ResetFiltersButton
                  styling="secondary"
                  disabled={isSelectedFilterEmpty}
                  onClick={handlerResetAll}
                  data-testid="cy-filters-resetFilters-button"
                  tabIndex={0}
                >
                  <Icon name="resetSpinner" />
                  {t('Pages.Models.Exploration.filterResetLabel')}
                </ResetFiltersButton>

                <PrimaryButton styling="primary" tabIndex={0} onClick={() => setMobileFiltersOpen(false)}>
                  {t('Pages.Models.Exploration.viewResultsButton')}
                </PrimaryButton>
              </ShadowBox>
            </ButtonsContainer>
          </>
        )}
      </Modal>
    </>
  );
};

export default FiltersListMobile;
