import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { useEffect, useState } from 'react';

import { getTrimPaymentApiPath, getTrimPaymentRequestObject, getTrimPaymentResponseObject } from './utils';
import { useApiHost, useAppName, usePageState, useSettings } from '../utils/sitecoreContext';

const useTrimPayment = (
  trim,
  paymentOptions,
  provinceCode,
  formatter,
  shouldFetch,
  vehicleType,
  isSellingPriceProvince,
  onPaymentChange,
  onFetchingChange,
) => {
  const [isFetching, setIsFetching] = useState(false);
  const [payment, setPayment] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { defaultProvince } = useSettings();
  const hondaRestApiHost = useApiHost();
  const pageState = usePageState();
  const appName = useAppName();
  const apiPath = getTrimPaymentApiPath(appName, pageState, vehicleType);

  const apiUrl = `https://${hondaRestApiHost}/${apiPath}`;
  const { trimKey, transmissionKey, exteriorColorKey } = trim;
  const { paymentFrequency, paymentMethod } = paymentOptions || {};

  useEffect(() => {
    if (!trimKey || !paymentOptions) return undefined;

    setIsFetching(true);
    const fetchCalculator = async () => {
      const requestObject = getTrimPaymentRequestObject({
        appName,
        provinceCode,
        defaultProvince,
        trim,
        paymentOptions,
        isSellingPriceProvince,
      });

      try {
        const response = await axios.post(apiUrl, requestObject);

        if (response?.data) {
          const data = camelcaseKeys(response.data, { deep: 'true' });
          const mappedResponse = getTrimPaymentResponseObject(appName, data);
          setPayment(mappedResponse);
          if (onPaymentChange && typeof onPaymentChange === 'function') onPaymentChange(mappedResponse);
          setIsFetching(false);
        } else {
          setHasError(true);
        }
        setIsFetching(false);
      } catch (err) {
        setHasError(true);
        setIsFetching(false);
      }
    };

    if (paymentFrequency && paymentMethod && shouldFetch) {
      fetchCalculator(trimKey);
    }

    return undefined;
  }, [trimKey, apiUrl, provinceCode, transmissionKey, exteriorColorKey, shouldFetch]);

  useEffect(() => {
    if (onFetchingChange && typeof onFetchingChange === 'function') onFetchingChange(isFetching);
  }, [isFetching]);

  return {
    payment: formatter && payment ? formatter(payment) : payment,
    isFetching,
    hasError,
  };
};

export default useTrimPayment;
