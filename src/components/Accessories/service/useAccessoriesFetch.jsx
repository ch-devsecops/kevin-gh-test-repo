import { useState, useEffect, useContext } from 'react';
import { UserLocationContext } from '@honda-canada/user-location';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { apiModes } from '../../../utils/constants';
import getProductLineLetter from '../../../utils/api/getProductLineLetter';
import isSSR from '../../../utils/isSSR';
import { useApiHost, useAppName, useLanguage, usePageState, useSettings } from '../../../utils/sitecoreContext';

const useAccessoriesFetch = ({ transmissionId, formatter, vehicleType }) => {
  const provinceCode = useContext(UserLocationContext)?.provinceCode;

  const [isFetching, setIsFetching] = useState(false);
  const [accessories, setAccessories] = useState(null);
  const [hasError, setHasError] = useState(false);

  const appName = useAppName();
  const hondaRestApiHost = useApiHost();
  const language = useLanguage();
  const pageState = usePageState();
  const { defaultProvince } = useSettings();

  const productLineLetter = getProductLineLetter.get(appName)[vehicleType] || getProductLineLetter.get(appName);
  const apiPath = `models/${productLineLetter}/${
    apiModes[pageState]
  }/transmissions/accessories/search/?transmissionIds=${transmissionId}&province=${
    provinceCode || defaultProvince
  }&AcceptLanguage=${language}`;
  const apiUrl = `https://${hondaRestApiHost}/${apiPath}`;

  useEffect(() => {
    if (isSSR()) return;
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);

        if (response?.data) {
          setAccessories(camelcaseKeys(response.data, { deep: 'true' }));
        }

        setIsFetching(false);
      } catch (ex) {
        setHasError(true);
        setIsFetching(false);
      }
    }

    if (transmissionId) {
      setIsFetching(true);
      fetchData();
    }
  }, [transmissionId, apiUrl]);

  return {
    accessories: formatter && accessories ? formatter(accessories) : accessories,
    accessoriesLength: accessories?.length,
    isFetching,
    hasError,
  };
};

export default useAccessoriesFetch;
