/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import safelyStringifyJSON from '../../../utils/safelyStringifyJSON';

import Context from './Context';
import { useConfiguration } from './utils';
import type { ConfigurationProviderProps } from '../types';

const ConfigurationProvider = ({ children, appNameConfig }: ConfigurationProviderProps) => {
  const config = useConfiguration(appNameConfig?.variant);
  const { cta } = appNameConfig;
  if (cta?.params && cta.href) {
    const searchParams = new URLSearchParams(cta.params);
    cta.href = `${cta?.href}?${searchParams}`;
  }

  const contextValue = useMemo(
    () => ({
      ...appNameConfig,
      cta,
      ...config,
    }),
    [safelyStringifyJSON(config), safelyStringifyJSON(appNameConfig)],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ConfigurationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ConfigurationProvider;
