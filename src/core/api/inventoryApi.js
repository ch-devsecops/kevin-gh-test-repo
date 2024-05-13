import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getHondaExpApiUrl from '../../apiHooks/utils/getHondaExpApiUrl';
import getHondaExperienceApiHeaders from '../../apiHooks/utils/getHondaExpApiHeaders';
import getInventoryStatusMock from '../../components/LocalInventoryStatus/mock/getInventoryStatusMock';
import useSotHondaExpApiConfig from '../../utils/sitecoreContext/useSotHondaExpApiConfig';

const DEALER_INVENTORY_ENDPOINT = 'dealer/inventory';

const dynamicBaseQuery = async (args, api, extraOptions) => {
  if (typeof args === 'object' && args?.mock) {
    console.log('Mocking enabled for inventory response');
    return {
      data: getInventoryStatusMock(args?.params) ?? 'No matching mock found',
    };
  }

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: args?.baseUrl,
    prepareHeaders: () => args?.headers,
  });

  return rawBaseQuery(args, api, extraOptions);
};
const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getModelInventoryStatus: builder.query({
      query: ({ baseUrl, headers, queryParams, mock }) => ({
        url: '',
        baseUrl,
        method: 'GET',
        headers,
        params: queryParams,
        // flag for mocking response, to be updated
        mock,
      }),
    }),
  }),
});

export default inventoryApi;

export const useGetModelInventoryStatus = (mock = false) => {
  const { consumerName, consumerId, env } = useSotHondaExpApiConfig();

  const apiUrl = getHondaExpApiUrl({
    env,
    consumerName,
  });

  const headers = getHondaExperienceApiHeaders({
    consumerId,
    consumerName,
  });
  const [trigger, result] = inventoryApi.useLazyGetModelInventoryStatusQuery();

  return {
    getModelInventoryStatus: queryParams =>
      trigger({ queryParams, mock, baseUrl: `${apiUrl}/${DEALER_INVENTORY_ENDPOINT}`, headers }),
    result,
  };
};
