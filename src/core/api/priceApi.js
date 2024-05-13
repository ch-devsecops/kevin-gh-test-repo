import { createApi } from '@reduxjs/toolkit/query/react';

import apiModes from '../../utils/apiModes';
import fetchBaseQuery from '../fetchBaseQuery';
import getProductLineLetter from '../../utils/api/getProductLineLetter';
import { getBuildPriceApiPath, getTrimPaymentApiPath } from '../../apiHooks/utils';
import { useApiUrl, useAppName, usePageState, useProvincesPath } from '../../utils/sitecoreContext';

export const priceApi = createApi({
  reducerPath: 'priceApi',
  baseQuery: fetchBaseQuery,
  endpoints: builder => ({
    getModelsPrice: builder.query({
      query: ({ url, body }) => ({ url, method: 'POST', body }),
    }),
    getTrimPayment: builder.query({
      query: ({ url, body }) => ({ url, method: 'POST', body }),
    }),
    getBuildPriceSummary: builder.query({
      query: ({ url, body }) => ({ url, method: 'POST', body }),
    }),
  }),
});

const FINANCIAL_SEGMENT = 'financials-worksheets';
const PRICE_CALCULATOR_SEGMENT = 'website/price-calculator';

// TODO replace those with the new ones
// getFinancialsApiPath
// getFinancialApiPath
export const useGetModelsPriceQuery = ({ vehicleType, body } = {}) => {
  const appName = useAppName();
  const pageState = usePageState();
  const apiUrl = useApiUrl();
  const provincePath = useProvincesPath();

  const productLineLetter = getProductLineLetter.get(vehicleType ?? appName);

  const url = `${apiUrl}${FINANCIAL_SEGMENT}/${productLineLetter}/${apiModes[pageState]}/${PRICE_CALCULATOR_SEGMENT}/${provincePath}`;

  const [handlePrice] = priceApi.useLazyGetModelsPriceQuery(url, body);

  const handlerCall = () => {
    handlePrice({ url, body, province: provincePath });
  };

  return handlerCall;
};

export const useGetTrimPaymentQuery = ({ vehicleType, queryOptions }) => {
  const appName = useAppName();
  const pageState = usePageState();
  const apiUrl = useApiUrl();

  const apiPath = getTrimPaymentApiPath(appName, pageState, vehicleType);
  const url = `${apiUrl}${apiPath}`;

  const [trigger, result] = priceApi.useLazyGetTrimPaymentQuery(queryOptions);

  return {
    // preferCacheValue set to true so that cached results are returned if present
    getPayment: body => trigger({ url, body }, true),
    result,
  };
};

export const useGetBuildPriceSummaryQuery = ({ queryOptions }) => {
  const appName = useAppName();
  const pageState = usePageState();
  const apiUrl = useApiUrl();

  const apiPath = getBuildPriceApiPath(appName, pageState);
  const url = `${apiUrl}${apiPath}`;

  const [trigger, result] = priceApi.useLazyGetBuildPriceSummaryQuery(queryOptions);

  return {
    getSummary: (body, additionalParams) => {
      trigger({ url, body, additionalParams });
    },
    result,
  };
};
