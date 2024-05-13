/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import safelyStringifyJSON from '../../../utils/safelyStringifyJSON';
import Context from './Context';
import { useConfiguration } from './utils';

const ConfigurationProvider = ({ children, variant, vehicleType, priceLabels }) => {
  const config = useConfiguration(variant, priceLabels);

  const contextValue = useMemo(
    () => ({
      variant,
      vehicleType,
      ...config,
    }),
    [variant, vehicleType, safelyStringifyJSON(config), safelyStringifyJSON(priceLabels)],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ConfigurationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ConfigurationProvider;
