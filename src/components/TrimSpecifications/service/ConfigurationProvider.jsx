import React, { useMemo, useState } from 'react';
import { useMediaQueries } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';

import Context from './Context';
import safelyStringifyJSON from '../../../utils/safelyStringifyJSON';

import { useConfiguration } from './utils';
import useProductFinancial from '../../../utils/hooks/useProductFinancial';

/**
 * This hook returns baseUrl for a given name in the sharedApps array (i.e., part of SitecoreContext).
 * @param {node} children - the TrimSpecifications component
 * @param {variant} string - variant number based on app (ie: 'variant3' when PSP)
 * @param {vehicleType} string - the vehicle type for PSP app (ie: OFF-ROAD)
 * @returns {node} - memoized context value passed into the component
 */
const TrimSpecificationsConfigurationProvider = ({ children, variant, vehicleType, appNameConfig }) => {
  const config = useConfiguration(variant);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidePerPage, setSlidePerPage] = useState(5);
  const [selectedTrim, setSelectedTrim] = useState();

  const { setModels, financial, hasError, isFetching } = useProductFinancial({ vehicleType });

  const { isSmallDesktop, isDesktop } = useMediaQueries();
  const isMobile = !(isSmallDesktop || isDesktop);
  const perPage = isMobile ? 1 : slidePerPage;

  const splideOptions = {
    perPage,
    pagination: false,
    arrows: false,
    start: currentSlide,
  };

  const contextValue = useMemo(
    () => ({
      variant,
      vehicleType,
      ...config,
      ...appNameConfig,
      slidePerPage,
      setSlidePerPage,
      selectedTrim,
      setSelectedTrim,
      currentSlide,
      setCurrentSlide,
      splideOptions,
      isMobile,
      setModels,
      financial,
      hasError,
      isFetching,
    }),
    [
      variant,
      slidePerPage,
      selectedTrim,
      currentSlide,
      perPage,
      isMobile,
      safelyStringifyJSON(config),
      safelyStringifyJSON(appNameConfig),
      safelyStringifyJSON(financial),
      hasError,
      isFetching,
    ],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

TrimSpecificationsConfigurationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default TrimSpecificationsConfigurationProvider;
