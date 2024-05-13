/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo, useState } from 'react';
import { useMediaQueries } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';

import Context from './Context';
import safelyStringifyJSON from '../../../utils/safelyStringifyJSON';

import { useConfiguration } from './utils';

const TrimSpecificationsConfigurationProvider = ({ children, variant, vehicleType }) => {
  const config = useConfiguration(variant);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidePerPage, setSlidePerPage] = useState(5);
  const [selectedTrim, setSelectedTrim] = useState();

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
      slidePerPage,
      setSlidePerPage,
      selectedTrim,
      setSelectedTrim,
      currentSlide,
      setCurrentSlide,
      splideOptions,
      isMobile,
    }),
    [variant, slidePerPage, selectedTrim, currentSlide, perPage, isMobile, safelyStringifyJSON(config)],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

TrimSpecificationsConfigurationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default TrimSpecificationsConfigurationProvider;
