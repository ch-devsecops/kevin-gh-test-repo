import React, { useMemo } from 'react';

import Context from './Context';
import safelyStringifyJSON from '../../../utils/safelyStringifyJSON';
import type { ConfigurationProviderProps } from '../types';
import { useAllVehicleEffects } from '../../TrimUtils';
import { useConfiguration } from './utils';

const ConfigurationProvider = ({ children, appNameConfig }: ConfigurationProviderProps) => {
  useAllVehicleEffects(appNameConfig?.params);

  const config = useConfiguration(appNameConfig?.variant);

  const contextValue = useMemo(
    () => ({
      ...appNameConfig,
      ...config,
    }),
    [safelyStringifyJSON(config), safelyStringifyJSON(appNameConfig)],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ConfigurationProvider;
