import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';
import flatten from 'lodash/flatten';

import { useLanguage, useAppName, useApiHost, usePageState } from '../../../utils/sitecoreContext';
import { apiModes, PSP_SITE_NAME } from '../../../utils/constants';
import getProductLineLetter from '../../../utils/api/getProductLineLetter';

const useSpecsWithVehicleTypes = (trimsByVehicleTypes = [], formatter) => {
  const language = useLanguage();
  const appName = useAppName();
  const apiHost = useApiHost();
  const pageState = usePageState();
  const [isFetching, setIsFetching] = useState(false);
  const [specifications, setSpecifications] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // group trim id by vehicle type and generate request url for each type
    const getUrlsByVehicleType = () => {
      if (!Array.isArray(trimsByVehicleTypes) || !trimsByVehicleTypes.length) return [];

      return flatten(
        trimsByVehicleTypes.map(item => {
          const { vehicleType, trimIds = [] } = item;
          const productLineLetter =
            appName === PSP_SITE_NAME
              ? getProductLineLetter.get(appName)[vehicleType]
              : getProductLineLetter.get(appName);

          const trimIdsStr = trimIds.join();

          const apiPath = `models/${productLineLetter}/${apiModes[pageState]}/trims/specs/withcategories?trimIds=${trimIdsStr}&AcceptLanguage=${language}`;
          const apiUrl = `https://${apiHost}/${apiPath}`;

          return productLineLetter && trimIdsStr ? [apiUrl] : [];
        }),
      );
    };

    const urlsByVehicleType = getUrlsByVehicleType();

    let shouldUpdate = true;
    const fetchSpecifications = async () => {
      try {
        if (!Array.isArray(urlsByVehicleType) || !urlsByVehicleType.length) return;

        const responses = await Promise.all(urlsByVehicleType.map(url => axios.get(url)));
        const data = flatten(responses.map(res => res?.data));

        if (shouldUpdate) {
          if (Array.isArray(data) && data.length) {
            setSpecifications(camelcaseKeys(data, { deep: true }));
          }
        }
      } catch (err) {
        if (shouldUpdate) {
          setHasError(true);
        }
      } finally {
        if (shouldUpdate) {
          setIsFetching(false);
        }
      }
    };

    fetchSpecifications();

    return () => {
      shouldUpdate = false;
    };
  }, [trimsByVehicleTypes, language, apiHost, appName, pageState]);

  return {
    specifications: formatter && specifications ? formatter(specifications) : specifications,
    isFetching,
    hasError,
  };
};

useSpecsWithVehicleTypes.propTypes = {
  trimsByVehicleTypes: PropTypes.arrayOf(
    PropTypes.shape({
      vehicleType: PropTypes.string,
      trimIds: PropTypes.arrayOf(PropTypes.number),
    }),
  ),
  formatter: PropTypes.func,
};

export default useSpecsWithVehicleTypes;
