/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import safelyStringifyJSON from '../../../utils/safelyStringifyJSON';

import Context from './Context';

const ConfigurationProvider = ({ children, appNameConfig }) => {
  const contextValue = useMemo(
    () => ({
      ...appNameConfig,
    }),
    [safelyStringifyJSON(appNameConfig)],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ConfigurationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ConfigurationProvider;
