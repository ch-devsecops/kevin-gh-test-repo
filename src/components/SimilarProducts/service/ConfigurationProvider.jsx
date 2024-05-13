import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';
import safelyStringifyJSON from '../../../utils/safelyStringifyJSON';

import { useConfiguration } from './utils';
import useProductFinancial from '../../../utils/hooks/useProductFinancial';

const ConfigurationProvider = ({ children, appNameConfig }) => {
  const config = useConfiguration(appNameConfig.variant);

  const { setModels, financial, hasError, isFetching } = useProductFinancial({
    vehicleType: appNameConfig?.vehicleType,
  });

  let ITEMS_PER_PAGE = 4;
  if (config.isMobile) {
    ITEMS_PER_PAGE = 1;
  }
  if (config.isTablet) {
    ITEMS_PER_PAGE = 2;
  }

  const carouselOptions = {
    padding: {
      top: 0,
      left: '8px',
      right: '8px',
    },
    perPage: ITEMS_PER_PAGE,
    perMove: ITEMS_PER_PAGE,
  };

  const contextValue = useMemo(
    () => ({
      ...appNameConfig,
      ...config,
      ITEMS_PER_PAGE,
      carouselOptions,
      setModels,
      financial,
      hasError,
      isFetching,
    }),
    [
      safelyStringifyJSON(config),
      ITEMS_PER_PAGE,
      safelyStringifyJSON(carouselOptions),
      safelyStringifyJSON(appNameConfig),
      safelyStringifyJSON(financial),
      hasError,
      isFetching,
    ],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ConfigurationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ConfigurationProvider;
