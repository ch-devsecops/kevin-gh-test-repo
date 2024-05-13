import { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';
import { UserLocationContext } from '@honda-canada/user-location';

import { useAppName, useApiHost, usePageState, useSettings } from '../sitecoreContext';
import safelyStringifyJSON from '../safelyStringifyJSON';
import { isEmpty } from '../object';
import { getFinancialApiPath } from '../financeUtils';

/**
 * Hook to fetch financial data from the Honda REST API.
 * @param {object} options - options object
 * @param {string} options.vehicleType - optional vehicle type to fetch financial data (PSP, ATV, SXS, MPP)
 * @param {function} options.formatter - optional function to format the exported financial data
 * @returns {object} - financial data
 * @returns {boolean} - hasError - true if there was an error fetching the data
 * @returns {boolean} - isFetching - true if the data is being fetched
 * @returns {array} - models - array of models to fetch financial data
 * @returns {function} - setFormatter - set the formatter function
 * @returns {function} - setIsSellingPriceProvince - set the isSellingPriceProvince flag
 * @returns {function} - setModels - set the models to fetch financial data
 */
const useProductFinancial = ({ vehicleType, formatter: formatterFn } = {}) => {
  const appName = useAppName();
  const hondaRestApiHost = useApiHost();
  const settings = useSettings();
  const defaultProvince = settings?.defaultProvince;
  const pageState = usePageState();

  const userLocationContext = useContext(UserLocationContext);
  const { provinceCode, isFetchingUserLocation } = userLocationContext || {};

  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [financial, setFinancial] = useState({});
  const [formatter, setFormatter] = useState(() => formatterFn);
  const [isSellingPriceProvince, setIsSellingPriceProvince] = useState(false);
  const [models, setModels] = useState([]);

  const apiPath = getFinancialApiPath(appName, pageState, vehicleType);
  const apiUrl = `https://${hondaRestApiHost}/${apiPath}/${provinceCode || defaultProvince}`;

  const setFinancialHandler = payload => {
    const { models: payloadModels, ...otherProps } = payload;
    setFinancial(prevState => {
      if (isEmpty(prevState)) {
        return payload;
      }
      return { ...prevState, ...otherProps, models: [...prevState.models, ...payloadModels] };
    });
  };

  const fetchAPI = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await axios.post(apiUrl, models);
      if (response?.data) {
        const payload = camelcaseKeys(response.data, { deep: 'true' });
        setFinancialHandler(payload);
      } else {
        setFinancial({});
        setHasError(true);
      }
      setIsFetching(false);
    } catch (err) {
      setFinancial({});
      setHasError(true);
      setIsFetching(false);
    }
  }, [apiUrl, safelyStringifyJSON(models)]);

  useEffect(() => {
    if (isFetchingUserLocation) {
      return undefined;
    }

    setIsFetching(false);

    if (models?.length > 0) {
      fetchAPI();
    }
  }, [apiUrl, safelyStringifyJSON(models)]);

  return {
    financial: typeof formatter === 'function' ? formatter(financial, isSellingPriceProvince) : financial,
    hasError,
    isFetching,
    models,
    setFormatter,
    setIsSellingPriceProvince,
    setModels,
  };
};

useProductFinancial.propTypes = {
  vehicleType: PropTypes.string,
  formatter: PropTypes.func,
};

export default useProductFinancial;
