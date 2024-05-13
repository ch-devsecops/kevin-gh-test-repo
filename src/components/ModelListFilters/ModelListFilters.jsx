import React, { useEffect, useState, useContext } from 'react';
import {
  Copy,
  Box,
  H6,
  Icon,
  IconWrapper,
  useMediaQueries,
  Modal,
  Media,
  Optional,
} from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';
import isSSR from '../../utils/isSSR';
import { ModelFiltersContext } from '../ModelFiltersContext';
import Categories from './Categories';
import ResetButton from './ResetButton';
import MobileFilterOpen from './MobileFilterOpen';
import MobileFilterClose from './MobileFilterClose';
import { MobileViewButton, MobileResetButton } from './MobileToolbarButtons';

import {
  getModelDataFromSitecoreRoute,
  getFilterableComponentsFromSitecoreRoute,
  getYearsFromModelData,
  getModelNamesFromModelData,
  getSpecialTrimNamesFromModelData,
  getExteriorColorsFromModelData,
  getTransmissionNamesFromModelData,
  getBodyTypesFromFilterTypes,
  pushGtmResetFiltersEvent,
  useFilterTypeConfiguration,
} from './service/utils';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import useAppName from '../../utils/sitecoreContext/useAppName';
import useRoute from '../../utils/sitecoreContext/useRoute';
import PriceFilter from './PriceFilter';
import { isEmpty } from '../../utils/object';
import themeStyles from './modelListFilter.styles';
import VehicleType from './VehicleType';
import Loader from '../../utils/components/Loader';

const ResetLabel = themeStyles.apply(Copy, 'ResetLabel');
const AvailableCount = themeStyles.apply(Copy, 'AvailableCount');
const Header = themeStyles.apply(Box, 'Header');

const ModelListFilters = ({ fields, rendering, variant }) => {
  const appName = useAppName();
  const route = useRoute();

  const {
    wrapperWidth,
    toggleContainerWidth,
    headerWidth,
    filterContainerWidth,
    defaultDesktopExpandedCategories,
    defaultMobileExpandedCategories,
  } = useFilterTypeConfiguration(variant);

  const modelData = getModelDataFromSitecoreRoute(route, rendering?.componentName);
  const showFutureVehiclesItem = getFilterableComponentsFromSitecoreRoute(route, 'FutureVehicleCard');
  const showNsxItem = getFilterableComponentsFromSitecoreRoute(route, 'NsxModelCard');
  const years = getYearsFromModelData(modelData);
  const modelNames = getModelNamesFromModelData(modelData);
  const specialTrimNames = getSpecialTrimNamesFromModelData(modelData);
  const exteriorColors = getExteriorColorsFromModelData(modelData);
  const transmissions = getTransmissionNamesFromModelData(modelData);
  const bodyTypes = getBodyTypesFromFilterTypes(fields?.data?.value?.filterType);

  const modelFiltersContext = useContext(ModelFiltersContext);
  const { filter, dispatchFilter, trimCount, setAllBodyTypes, filterHasValues, financials, loadingOnNavigation } =
    modelFiltersContext || {};
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(defaultDesktopExpandedCategories);
  const isResetDisabled =
    !filterHasValues && !filter?.onlyFutureVehicles && !filter?.onlyNsx && isEmpty(filter?.priceRange);
  const { t } = useTranslation();
  const { isMobile } = useMediaQueries();
  const filterTypes = fields?.data?.value?.filterType;
  const { isPriceFilterHidden } = useFilterTypeConfiguration(variant, filterTypes);
  const gtmCategory = fields?.data?.value?.gtmCategory;
  // will only show price filter on auto and marine based on the useFilterTypeConfiguration
  const isFilterHidden = fields?.data?.value?.hidePriceFilter?.item?.value || isPriceFilterHidden;
  const hideModelFilter = fields?.data?.value?.hideModelFilter;
  const hideYearFilter = fields?.data?.value?.hideYearFilter;

  const vehicleTypeList = [
    fields?.data?.value?.vehicleTypeLink1?.item?.value,
    fields?.data?.value?.vehicleTypeLink2?.item?.value,
    fields?.data?.value?.vehicleTypeLink3?.item?.value,
    fields?.data?.value?.vehicleTypeLink4?.item?.value,
  ].filter(i => i?.href);

  useEffect(() => {
    if (!filterTypes) return undefined;

    const expandedByDefault = filterTypes
      .filter(type => type?.expandedByDefault?.item?.value)
      .map(type => type?.filterCategory?.fields?.name);

    if (isMobile) {
      setExpandedCategories([...defaultMobileExpandedCategories]);
    } else {
      setExpandedCategories([...expandedByDefault, ...defaultDesktopExpandedCategories]);
      setAllBodyTypes(bodyTypes);
    }

    return undefined;
  }, [isMobile]);

  const vehiclePath = !isSSR() && window?.location?.pathname;

  // allows filters to reset on a switched vehicle type
  useEffect(() => {
    dispatchFilter({ type: 'RESET' });
  }, [vehiclePath]);

  if (!fields?.data?.value) {
    return null;
  }

  const handleCloseMobileFilter = () => {
    setIsMobileFiltersOpen(false);
    setExpandedCategories(defaultMobileExpandedCategories);
  };

  const handlePressCloseMobileFilter = () => keypressCallback(keyCodes.ENTER, handleCloseMobileFilter);
  const handleReset = () =>
    keypressCallback(keyCodes.ENTER, () => {
      dispatchFilter({ type: 'RESET' });
      dispatchFilter({ type: 'SET_PRICE_MODELS', payload: financials });
    });

  const { filterLabel, resetFilters, trimAvailablePlural, trimAvailableSingular } = fields?.data?.value || {};
  const trimCountString = trimCount === 0 || trimCount > 1 ? trimAvailablePlural?.value : trimAvailableSingular?.value;

  const renderLoader = () => (
    <Loader
      horizontalAlignment="center"
      loaderStyles={{
        styles: {
          height: ['20px', '20px', '20px'],
          width: ['20px', '20px', '20px'],
          margin: ['10px 0', '10px 0', '10px 0'],
        },
      }}
    />
  );

  return (
    <Box
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={rendering?.componentName}
      width={wrapperWidth}
    >
      <Media lessThan="desktop">
        <Header pl="20px">
          <MobileFilterOpen
            as="button"
            data-testid="cy-mobile-filter-button"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <H6>{t('Pages.Models.Exploration.filterOpenLabel')}</H6>
            <IconWrapper>
              <Icon name="animatedPlusMinus" />
            </IconWrapper>
          </MobileFilterOpen>
        </Header>
        <Modal
          isOpen={isMobileFiltersOpen}
          closeModal={handleCloseMobileFilter}
          styling="fullOverlay"
          allowClose={false}
        >
          {() => (
            <Box py="45px">
              <Box
                minHeight="45px"
                position="fixed"
                top={0}
                zIndex="modal"
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={['20px', '20px', 4]}
                bg="grey.5"
              >
                <H6>{filterLabel?.value}</H6>
                <MobileFilterClose as="button" onClick={handleCloseMobileFilter}>
                  <Icon name="close" />
                </MobileFilterClose>
              </Box>
              {!isFilterHidden && <PriceFilter />}

              <VehicleType
                vehicleTypeList={vehicleTypeList}
                expandedCategories={expandedCategories}
                setExpandedCategories={setExpandedCategories}
                filterContainerWidth={filterContainerWidth}
                toggleContainerWidth={toggleContainerWidth}
              />

              <Categories
                years={years}
                modelNames={modelNames}
                specialTrimNames={specialTrimNames}
                exteriorColors={exteriorColors}
                transmissions={transmissions}
                filterTypes={filterTypes}
                filter={filter}
                dispatchFilter={dispatchFilter}
                expandedCategories={expandedCategories}
                setExpandedCategories={setExpandedCategories}
                modelData={modelData}
                isFutureVehiclesItemVisible={showFutureVehiclesItem}
                isFutureVehiclesItemEnabled={!filterHasValues}
                isNsxItemVisible={showNsxItem}
                isNsxItemEnabled={!filterHasValues && !filter?.onlyFutureVehicles}
                hideModelFilter={hideModelFilter}
                hideYearFilter={hideYearFilter}
                variant={variant}
              />
              <Box
                position="fixed"
                bottom={0}
                left={0}
                width="100%"
                borderTop="1px solid"
                borderColor="grey.2"
                boxShadow="0px -2px 4px rgba(0, 0, 0, 0.1)"
                display="flex"
              >
                <MobileResetButton
                  onClick={() => {
                    if (!isResetDisabled) {
                      pushGtmResetFiltersEvent(appName);
                      dispatchFilter({ type: 'RESET' });
                      dispatchFilter({ type: 'SET_PRICE_MODELS', payload: financials });
                    }
                  }}
                  onKeyDown={handleReset}
                  disabled={isResetDisabled}
                >
                  <Icon name="reset" mr="s" iconColor={isResetDisabled ? 'grey.1' : 'black'} />
                  {resetFilters.value}
                </MobileResetButton>
                <MobileViewButton
                  data-testid="products-available"
                  variant="primary"
                  onClick={handleCloseMobileFilter}
                  onKeyDown={handlePressCloseMobileFilter}
                  disabled={trimCount === 0}
                >
                  <Optional when={loadingOnNavigation}>{renderLoader()}</Optional>
                  <Optional when={!loadingOnNavigation}>{`${trimCount} ${trimCountString}`}</Optional>
                </MobileViewButton>
              </Box>
            </Box>
          )}
        </Modal>
      </Media>
      <Media greaterThan="smallDesktop">
        <VehicleType
          vehicleTypeList={vehicleTypeList}
          headerWidth={headerWidth}
          filterContainerWidth={filterContainerWidth}
        />

        <Header px={['20px', '20px', 4]} headerWidth={headerWidth}>
          <H6>{filterLabel?.value}</H6>
          <ResetButton
            data-testid={isResetDisabled ? 'reset-disabled' : 'reset-filters'}
            onClick={() => {
              if (!isResetDisabled) {
                pushGtmResetFiltersEvent(appName);
                dispatchFilter({ type: 'RESET' });
                dispatchFilter({ type: 'SET_PRICE_MODELS', payload: financials });
              }
            }}
            onKeyDown={handleReset}
            isDisabled={isResetDisabled}
            as="button"
          >
            <Icon name="reset" mr="s" iconColor={isResetDisabled ? 'grey.0' : 'black'} />
            <ResetLabel as="span" size="s">
              {resetFilters.value}
            </ResetLabel>
          </ResetButton>
        </Header>
        <Optional when={loadingOnNavigation}>{renderLoader()}</Optional>
        <Optional when={!loadingOnNavigation}>
          <AvailableCount data-testid="products-available" size="small">
            {`${trimCount} ${trimCountString}`}
          </AvailableCount>
        </Optional>
        <Optional when={!isFilterHidden}>
          <PriceFilter filterContainerWidth={filterContainerWidth} toggleContainerWidth={toggleContainerWidth} />
        </Optional>

        <Categories
          years={years}
          modelNames={modelNames}
          specialTrimNames={specialTrimNames}
          exteriorColors={exteriorColors}
          transmissions={transmissions}
          filterTypes={filterTypes}
          filter={filter}
          dispatchFilter={dispatchFilter}
          expandedCategories={expandedCategories}
          setExpandedCategories={setExpandedCategories}
          modelData={modelData}
          isFutureVehiclesItemVisible={showFutureVehiclesItem}
          isFutureVehiclesItemEnabled={!filterHasValues}
          isNsxItemVisible={showNsxItem}
          isNsxItemEnabled={!filterHasValues && !filter?.onlyFutureVehicles}
          filterContainerWidth={filterContainerWidth}
          toggleContainerWidth={toggleContainerWidth}
          hideModelFilter={hideModelFilter}
          hideYearFilter={hideYearFilter}
          variant={variant}
        />
      </Media>
    </Box>
  );
};

export default ModelListFilters;
