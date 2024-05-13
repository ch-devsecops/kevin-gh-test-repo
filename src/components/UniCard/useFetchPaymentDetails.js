import camelcaseKeys from 'camelcase-keys';
import { UserLocationContext } from '@honda-canada/user-location';
import { useContext, useMemo } from 'react';

import safelyStringifyJSON from '../../utils/safelyStringifyJSON';
import useFetchData from '../../utils/hooks/useFetchData';
import usePriceFlagsForProvince from '../PriceComponent/utils';
import { getTrimPaymentApiPath, getTrimPaymentRequestObject, getTrimPaymentResponseObject } from '../../apiHooks/utils';
import { useApiHost, useAppName, usePageState, useSettings } from '../../utils/sitecoreContext';

/**
 * @typedef {Object} Trim
 * @property {string} trimKey
 * @property {string} modelKey
 * @property {string} modelYear
 * @property {string} transmissionKey
 * @property {string} exteriorColorKey
 * @property {string} [interiorColorKey]
 *
 * @param {Trim} [trim]
 * @param {string} [paymentFrequency]
 * @param {string} [paymentMethod]
 * @param {Function} [formatter]
 * @param {boolean} [shouldFetch]
 * @param {string} [vehicleType]
 * @return {{ payment: Object, hasError: boolean, isFetching: boolean, isSellingPriceProvince: boolean }}
 */
const useFetchPaymentDetails = (trim, paymentFrequency, paymentMethod, shouldFetch = true, formatter, vehicleType) => {
  const { defaultProvince } = useSettings();
  const provinceCode = useContext(UserLocationContext)?.provinceCode || defaultProvince;
  const { showSellingPrice: isSellingPriceProvince } = usePriceFlagsForProvince();
  const hondaRestApiHost = useApiHost();
  const pageState = usePageState();
  const appName = useAppName();
  const apiPath = getTrimPaymentApiPath(appName, pageState, vehicleType);

  const isValid =
    hondaRestApiHost &&
    apiPath &&
    trim?.trimKey &&
    trim?.modelKey &&
    trim?.modelYear &&
    paymentFrequency &&
    paymentMethod;

  const apiUrl = shouldFetch && isValid ? `https://${hondaRestApiHost}/${apiPath}` : '';

  const trimDependency = safelyStringifyJSON(trim);
  const fetchOptions = useMemo(() => {
    const payload = getTrimPaymentRequestObject({
      appName,
      provinceCode,
      defaultProvince,
      trim,
      paymentOptions: { paymentFrequency, paymentMethod },
      isSellingPriceProvince,
    });

    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: safelyStringifyJSON(payload),
    };
  }, [appName, provinceCode, defaultProvince, trimDependency, paymentFrequency, paymentMethod, isSellingPriceProvince]);

  const { data, error, isLoading } = useFetchData(apiUrl, fetchOptions);

  const payment = getTrimPaymentResponseObject(appName, camelcaseKeys(data, { deep: true }));

  return {
    payment: formatter && payment ? formatter(payment) : payment,
    isSellingPriceProvince,
    isFetching: isLoading,
    hasError: !!error,
  };
};

export default useFetchPaymentDetails;
