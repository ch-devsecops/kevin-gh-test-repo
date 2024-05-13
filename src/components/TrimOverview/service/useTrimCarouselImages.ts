import { useSelector } from 'react-redux';
import useFetchData from '../../../utils/hooks/useFetchData';
import { useAppName, useLanguage, useSitecoreApiHost, useSitecoreApiKey } from '../../../utils/sitecoreContext';
import { getTrimDetails } from '../../../core/reducers/inventoryVehicleDetails';
import type { transmissionColorType } from '../types';

const useTrimCarouselImages = (SitecoreId?: string) => {
  const { exteriorColorKey, interiorColorKey } = useSelector(getTrimDetails);
  const appName = useAppName();
  const language = useLanguage();
  const sitecoreApiHost = useSitecoreApiHost();
  const sitecoreApiKey = useSitecoreApiKey();
  const shouldSendRequest = SitecoreId && sitecoreApiKey && appName;
  const params = `sc_apikey=${sitecoreApiKey}&sc_site=${appName}&sc_lang=${language}`;
  const createApiUrl = (endpoint: string, shouldFetch: boolean) =>
    shouldFetch ? `${sitecoreApiHost || ''}${endpoint}?${params}` : '';

  const {
    data: transmissionData,
    error,
    isLoading,
  } = useFetchData(createApiUrl(`/dmmapi/trimandcolors/transmission/${SitecoreId}`, !!shouldSendRequest));

  const selectedExteriorColor = transmissionData?.transmission?.exteriorColors?.find(
    (item: transmissionColorType) => item.fields.color.fields.detKey.value === exteriorColorKey,
  );

  const exteriorColorId = selectedExteriorColor?.fields?.studioAssets?.id;

  const interiorColorId = selectedExteriorColor?.fields?.interiorColors?.find(
    (item: transmissionColorType) =>
      item?.fields?.color?.fields?.detKey?.value === decodeURIComponent(interiorColorKey),
  )?.fields?.studioAssets?.id;

  const { data: exteriorImagesData } = useFetchData(
    createApiUrl(`/dmmapi/children/parent/${exteriorColorId}/studioAssets`, exteriorColorId),
  );

  const { data: interiorImagesData } = useFetchData(
    createApiUrl(`/dmmapi/children/parent/${interiorColorId}/studioAssets`, interiorColorId),
  );

  return {
    exteriorImagesData: exteriorImagesData?.studioAssets?.children,
    interiorImagesData: interiorImagesData?.studioAssets?.children,
    isFetching: isLoading,
    hasError: !!error,
  };
};

export default useTrimCarouselImages;
