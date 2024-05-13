import { useMemo, useContext } from 'react';
import { UserLocationContext } from '@honda-canada/user-location';
import camelcaseKeys from 'camelcase-keys';
import useFetchData from './useFetchData';
import { useAppName, useApiHost, usePageState, useSettings } from '../sitecoreContext';
import { getFinancialApiPath } from '../financeUtils';
import safelyStringifyJSON from '../safelyStringifyJSON';

/**
 * Data fetching hook for pricing-calculator
 *
 * @param {Object} options
 * @param {{ modelYear: string, modelKey: string }[]} options.models
 * @param {boolean} [options.shouldFetch=true]
 * @param {string} options.vehicleType
 * @return {{ data: Object, isFetching: boolean, hasError: boolean}}
 */
const useFetchFinancial = ({ models, shouldFetch = true, vehicleType }) => {
  const appName = useAppName();
  const hondaRestApiHost = useApiHost();
  const pageState = usePageState();
  const settings = useSettings();

  const defaultProvince = settings?.defaultProvince;
  const userLocationContext = useContext(UserLocationContext);
  const { provinceCode, isFetchingUserLocation } = userLocationContext || {};

  const apiPath = getFinancialApiPath(appName, pageState, vehicleType);
  const apiUrl =
    shouldFetch && hondaRestApiHost && apiPath && !isFetchingUserLocation
      ? `https://${hondaRestApiHost}/${apiPath}/${provinceCode || defaultProvince}`
      : '';

  const modelsDependency = JSON.stringify(models);
  const fetchOptions = useMemo(() => {
    const payload = models || [];

    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: safelyStringifyJSON(payload),
    };
  }, [modelsDependency]);

  const { data, isLoading, error } = useFetchData(apiUrl, fetchOptions);

  return {
    data: camelcaseKeys(data, { deep: true }),
    isFetching: isLoading,
    hasError: !!error,
  };
};

export default useFetchFinancial;
