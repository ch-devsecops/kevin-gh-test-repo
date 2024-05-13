import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Box } from '@honda-canada/design-system-react';
import { getBapQueryStringVariables, getOffersStringVariables } from '../../utils/urls';
import { getModelYear, getModelKeyFromRoute, getIsDarkFromRoute } from './utils';
import { parseBool } from '../../utils/common';
import useAppName from '../../utils/sitecoreContext/useAppName';
import { MARINE_SITE_NAME } from '../../utils/constants';

export const ModelExplorationContext = createContext();
ModelExplorationContext.displayName = 'ModelExplorationContext';

const ModelExplorationContextProvider = ({ children }) => {
  const { sitecoreContext } = useSitecoreContext();
  const appName = useAppName();

  const [selectedTrim, setSelectedTrim] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [isModelNavOpen, setIsModelNavOpen] = useState(false);
  const [isTrimSelectorOpen, setIsTrimSelectorOpen] = useState(false);
  const [bapUrlParams, setBapUrlParams] = useState('');
  const [offersUrlParams, setoffersUrlParams] = useState('');

  const [navItems, setNavItems] = useState(null);

  const trimKey = selectedTrim?.trimKey;

  const isMarine = sitecoreContext?.site?.name === MARINE_SITE_NAME;

  const modelYear = isMarine ? null : getModelYear(sitecoreContext);
  const modelKey = getModelKeyFromRoute(sitecoreContext, appName);
  const isDark = getIsDarkFromRoute(sitecoreContext);
  const transmissionModelCode = selectedTrim?.transmissionModelCode;

  if (selectedTrim && typeof selectedTrim !== 'object') {
    console.warn('ModelExplorationContext setSelectedTrim expects a trim object');
  }

  useEffect(() => {
    setBapUrlParams(getBapQueryStringVariables(modelKey, modelYear, trimKey, transmissionModelCode));
  }, [trimKey, modelYear, modelKey, transmissionModelCode]);

  useEffect(() => {
    if (selectedTrim) {
      setSelectedTrim(null);
    }

    if (selectedTransmission) {
      setSelectedTransmission(null);
    }

    setoffersUrlParams(getOffersStringVariables(modelKey, modelYear));
  }, [modelYear, modelKey]);

  useEffect(() => {
    if (selectedTrim) {
      const newTrim = {
        ...selectedTrim,
        defaultExteriorColorKey: selectedTransmission?.defaultExteriorColor?.item?.fields?.color?.fields?.detKey?.value,
        transmissionKey: selectedTransmission?.detKey?.value,
        transmissionModelCode: selectedTransmission?.detKey?.value,
        isBuildable: parseBool(selectedTransmission?.isBuildable?.value),
        isComparable: parseBool(selectedTransmission?.isComparable?.value),
        isTestDrivable: parseBool(selectedTransmission?.isTestDrivable?.value),
        hidePriceAndFinance: parseBool(selectedTransmission?.hidePriceAndFinance?.value),
      };
      setSelectedTrim(newTrim);
    }
  }, [selectedTransmission]);

  const value = React.useMemo(
    () => ({
      selectedTrim,
      setSelectedTrim,
      selectedTransmission,
      setSelectedTransmission,
      modelYear,
      bapUrlParams,
      setBapUrlParams,
      isModelNavOpen,
      setIsModelNavOpen,
      isTrimSelectorOpen,
      setIsTrimSelectorOpen,
      offersUrlParams,
      setoffersUrlParams,
      isDark,
      navItems,
      setNavItems,
    }),
    [
      selectedTrim,
      selectedTransmission,
      modelYear,
      bapUrlParams,
      isModelNavOpen,
      isTrimSelectorOpen,
      offersUrlParams,
      isDark,
      navItems,
    ],
  );

  return (
    <ModelExplorationContext.Provider value={value}>
      {isDark ? <Box bg="black">{children}</Box> : children}
    </ModelExplorationContext.Provider>
  );
};

ModelExplorationContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ModelExplorationContextProvider;
