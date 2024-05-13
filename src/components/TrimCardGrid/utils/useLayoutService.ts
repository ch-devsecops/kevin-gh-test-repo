import { useMemo } from 'react';
import { flatten } from 'lodash';
import useFetchData from '../../../utils/hooks/useFetchData';
import { useAppName, useLanguage, useSitecoreApiHost, useSitecoreApiKey } from '../../../utils/sitecoreContext';
import type { Trim, LayoutServiceResponse, LayoutServiceModel } from '../interfaces';
import formatTrimFilters from './utils';

const useLayoutService = (
  selectedModelId: string,
  selectedModelYear: string,
  shouldFetch = true,
): LayoutServiceResponse => {
  const appName = useAppName();
  const language = useLanguage();
  const sitecoreApiHost = useSitecoreApiHost();
  const sitecoreApiKey = useSitecoreApiKey();

  const shouldSendRequest = shouldFetch && selectedModelId && sitecoreApiKey && appName;

  const apiUrl = shouldSendRequest
    ? `${
        sitecoreApiHost || ''
      }/dmmapi/trimswithtransmissions/model/${selectedModelId}/${selectedModelYear}?sc_apikey=${sitecoreApiKey}&sc_site=${appName}&sc_lang=${language}`
    : '';

  const fetchOptions = useMemo(
    () => ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    [],
  );

  const { data, isLoading, error }: { data: LayoutServiceModel; isLoading: boolean; error: string } = useFetchData(
    apiUrl,
    fetchOptions,
  );

  let trims: Trim[] = [];
  if (data && !isLoading) {
    trims = flatten(
      data?.model?.modelYear?.trims.map(trim =>
        trim.transmissions.map(transmission => ({
          modelName: data?.model?.name,
          modelKey: data?.model?.fields?.detKey?.value,
          trimName: trim.name,
          trimKey: trim?.fields?.detKey?.value,
          year: data?.model?.modelYear?.name,
          transmissionKey: transmission?.fields?.detKey?.value,
          transmissionName: trim?.transmissions?.length > 1 ? transmission?.name : '',
          exteriorColorKey: transmission?.fields?.defaultExteriorColor?.fields?.color?.fields?.detKey?.value,
          interiorColorKey:
            transmission?.fields?.defaultExteriorColor?.fields?.defaultInteriorColor?.fields?.color?.fields?.detKey
              ?.value,
          primaryThumbnail: trim?.fields?.primaryThumbnail,
          secondaryThumbnail: trim?.fields?.secondaryThumbnail,
          filters: formatTrimFilters(trim.fields),
        })),
      ),
    );
  }

  return {
    trims,
    isFetching: isLoading,
    hasError: !!error,
  };
};

export default useLayoutService;
