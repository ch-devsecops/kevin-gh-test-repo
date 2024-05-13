/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo, useReducer } from 'react';
import { useMediaQueries } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';

import safelyStringifyJSON from '../../../utils/safelyStringifyJSON';
import isSSR from '../../../utils/isSSR';

import Context from './Context';
import { reducer } from './reducer';
import { useConfiguration } from './utils';
import useAccessoriesFetch from './useAccessoriesFetch';
import { ACCESSORY_TYPE_LABEL_ALL } from './constants';

const AccessoriesConfigurationProvider = ({ children, variant, vehicleType }) => {
  const config = useConfiguration(variant);
  const { accessoryFormatter, transmissionStateKey, isDark, ...configRest } = config;

  const { isSmallDesktop, isDesktop } = useMediaQueries();
  const isMobile = !(isSmallDesktop || isDesktop);

  let searchParams;
  if (!isSSR()) {
    searchParams = new URLSearchParams(decodeURIComponent(window?.location?.search));
  }
  const trimKeyParam = searchParams && searchParams.get('trim');

  const [state, dispatch] = useReducer(reducer, {
    isModalOpen: false,
    submittedTrim: null,
    submittedTransmission: null,
    submittedAccessoryType: ACCESSORY_TYPE_LABEL_ALL,
    selectedTrim: null,
    selectedTransmission: null,
    selectedAccessoryType: ACCESSORY_TYPE_LABEL_ALL,
    selectedAccessory: {},
  });
  const {
    selectedTrim,
    selectedTransmission,
    submittedTrim,
    isModalOpen,
    selectedAccessoryType,
    submittedAccessoryType,
    selectedAccessory,
  } = state;

  const { accessories, accessoriesLength, isFetching, hasError } = useAccessoriesFetch({
    transmissionId: state[transmissionStateKey],
    formatter: accessoryFormatter,
    vehicleType,
  });

  const selectedOptions = {
    trim: selectedTrim,
    transmission: selectedTransmission,
    accessoryType: selectedAccessoryType,
  };

  const contextValue = useMemo(
    () => ({
      variant,
      vehicleType,
      trimKeyParam,
      isMobile,
      isDark,
      selectedOptions,
      ...configRest,

      // Reducer actions
      dispatch,
      isModalOpen,
      selectedAccessory,
      selectedTrim,
      selectedTransmission,
      selectedAccessoryType,
      submittedTrim,
      submittedAccessoryType,

      // useAccessoriesFetch values
      accessories,
      accessoriesLength,
      isFetching,
      hasError,
    }),
    [
      variant,
      vehicleType,
      hasError,
      isFetching,
      isMobile,
      isModalOpen,
      selectedAccessory,
      selectedAccessoryType,
      selectedTransmission,
      selectedTrim,
      submittedAccessoryType,
      submittedTrim,
      safelyStringifyJSON(accessories),
      safelyStringifyJSON(config),
    ],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

AccessoriesConfigurationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AccessoriesConfigurationProvider;
