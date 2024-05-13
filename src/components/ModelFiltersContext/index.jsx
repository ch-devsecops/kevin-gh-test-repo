import React, { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { flatten } from 'lodash/array';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';

import { filterReducer, modelListFilters as initialState } from './reducer';
import usePrevious from '../../utils/hooks/usePrevious';
import useAppName from '../../utils/sitecoreContext/useAppName';
import { pushGtmSelectCategoryFilterEvent } from '../ModelListFilters/service/utils';
import { ACURA_SITE_NAME, HONDA_SITE_NAME, MARINE_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import { usePricesFromFinancialModel } from '../../utils/financeUtils';
import { isEmpty } from '../../utils/object';
import safelyStringifyJSON from '../../utils/safelyStringifyJSON';
import { INITIAL_VALUE_PRICE_RANGE, getModelProduct, getSelectedCategories, getTrimProduct } from './utils';
import useProductFinancial from '../../utils/hooks/useProductFinancial';

const mapFinancial = {
  models: getModelProduct,
  trims: getTrimProduct,
};

export const ModelFiltersContext = createContext();
ModelFiltersContext.displayName = 'ModelFiltersContext';

const ModelFiltersContextProvider = ({ children }) => {
  const { t } = useTranslation();
  const priceLabels = {
    allInPrice: { label: t('Shared.Common.sellingPriceStartingFromLabel') },
  };

  const appName = useAppName();
  const [loadingOnNavigation, setLoadingOnNavigation] = useState(true);
  const [allBodyTypes, setAllBodyTypes] = useState([]);
  const [filter, dispatch] = useReducer(filterReducer, initialState);
  const [initialRender, setInitialRender] = useState(true);
  const [prices, setPrices] = useState(INITIAL_VALUE_PRICE_RANGE);
  const [vehicleType, setVehicleType] = useState(null);

  const { financial, isFetching, hasError, setFormatter, setIsSellingPriceProvince, models, setModels } =
    useProductFinancial({
      vehicleType,
    });

  let productType;
  let modelKey;

  switch (appName) {
    case MARINE_SITE_NAME:
      productType = 'models';
      modelKey = 'modelKey';
      break;

    case PSP_SITE_NAME:
      productType = 'trims';
      modelKey = 'id';
      break;

    // fall through
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
    default:
      productType = 'trims';
      modelKey = 'id';
      break;
  }
  const mapModelsKeys = {
    models,
    trims: filter.modelConfigurationArray,
  };
  const { getPrices } = usePricesFromFinancialModel(priceLabels, productType);

  useEffect(() => {
    if (!isEmpty(filter?.modelKeys)) {
      setModels(uniqWith(flatten(Object.values(filter?.modelKeys)), isEqual));
    }
  }, [safelyStringifyJSON(filter?.modelKeys)]);

  useEffect(() => {
    if (!isEmpty(financial)) {
      dispatch({ type: 'SET_PRICE_MODELS', payload: financial });
    }
  }, [safelyStringifyJSON(financial)]);

  const modelPrices =
    mapModelsKeys[productType]?.reduce(
      (acc, model) => ({
        ...acc,
        [get(model, modelKey)]: getPrices(mapFinancial[productType](financial?.models, get(model, modelKey))),
      }),
      {},
    ) || {};

  /**
   * Each ModelCardWithTrims component should call setTrimCount after the filter values change
   * @param {Object} payload
   * @param {string} payload.modelKey - a model key from web catalog data
   * @param {number} payload.count - how many of the model's trims match the filter values
   */
  const setTrimCount = payload => {
    setLoadingOnNavigation(false);
    dispatch({ type: 'SET_TRIM_COUNTS', payload });
  };

  const setPriceRange = payload => {
    dispatch({ type: 'SET_PRICE_RANGE', payload });
  };

  const setModelKeys = payload => {
    dispatch({ type: 'SET_MODEL_KEYS', payload });
  };

  useEffect(() => {
    setInitialRender(false);
  }, []);

  useEffect(() => {
    if (isEmpty(filter?.priceRange)) {
      setPrices(INITIAL_VALUE_PRICE_RANGE);
    }
  }, [safelyStringifyJSON(filter?.priceRange)]);

  /**

  For GTM: Filter selections are dispatched, and then as each ModelCardWithTrims component
  calculates its number of trims, it dispatches its trim count.

  So when the previous selections change, the current render has the accurate trim count.
  This could probably be accomplished in a less brittle way with redux-thunk or redux-saga,
  but this workaround accomplished what we want without adding that complexity and
  extra dependencies.

  WARNING: if the order in which actions are dispatched changes, this will probably break.

  */
  const trimCountsByModel = filter.trimCounts && Object.values(filter?.trimCounts);
  const trimCount = trimCountsByModel.reduce((a, b) => a + b, 0);
  const filterSelectionsString = safelyStringifyJSON(filter?.values);
  const previousFilterSelectionString = usePrevious(filterSelectionsString);

  useEffect(() => {
    // prevents GTM call on initial render, before the user has made any selections
    if (initialRender) return undefined;

    const maxPrice = filter.priceRange.max;
    const minPrice = filter.priceRange.min;
    const selectedFilters = getSelectedCategories(filter?.values);
    if (selectedFilters) {
      pushGtmSelectCategoryFilterEvent(
        selectedFilters,
        trimCount,
        appName,
        maxPrice && maxPrice !== Infinity ? maxPrice : '',
        minPrice > 0 ? minPrice : '',
        vehicleType,
      );
    }

    return undefined;
  }, [previousFilterSelectionString, initialRender]);

  return (
    <ModelFiltersContext.Provider
      value={useMemo(
        () => ({
          allBodyTypes,
          dispatchFilter: dispatch,
          filter,
          filterHasValues: Object.values(filter?.values).some(value => value.length > 0),
          financials: financial,
          hasError,
          isFetching,
          loadingOnNavigation,
          modelPrices,
          prices,
          setAllBodyTypes,
          setFormatter,
          setIsSellingPriceProvince,
          setLoadingOnNavigation,
          setModelKeys,
          setModels,
          setPriceRange,
          setPrices,
          setTrimCount,
          setVehicleType,
          trimCount,
        }),
        [
          safelyStringifyJSON(filter),
          trimCount,
          loadingOnNavigation,
          isFetching,
          hasError,
          safelyStringifyJSON(prices),
          safelyStringifyJSON(allBodyTypes),
          safelyStringifyJSON(modelPrices),
        ],
      )}
    >
      {children}
    </ModelFiltersContext.Provider>
  );
};

ModelFiltersContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ModelFiltersContextProvider;
