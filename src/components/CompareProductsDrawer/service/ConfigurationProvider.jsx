import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';
import safelyStringifyJSON from '../../../utils/safelyStringifyJSON';

import useConfiguration from './config';

/**
 * This hook returns baseUrl for a given name in the sharedApps array (i.e., part of SitecoreContext).
 * @param {node} children - the Compare Products Drawer component
 * @param {variant} string - variant number based on app (ie: 'variant3' when PSP)
 * @returns {node} - memoized context value passed into the component
 */
const CompareProductsDrawerConfigurationProvider = ({ children, variant }) => {
  const config = useConfiguration(variant);

  const contextValue = useMemo(
    () => ({
      variant,
      ...config,
    }),
    [variant, safelyStringifyJSON(config)],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

CompareProductsDrawerConfigurationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default CompareProductsDrawerConfigurationProvider;
