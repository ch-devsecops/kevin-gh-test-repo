import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';

import { useLanguage, useAppName, useApiHost, usePageState } from '../sitecoreContext';
import { apiModes } from '../constants';
import getProductLineLetter from '../api/getProductLineLetter';

const useSpecifications = ({ trims = [], formatter, vehicleType }) => {
  const language = useLanguage();
  const appName = useAppName();
  const apiHost = useApiHost();
  const pageState = usePageState();
  const [isFetching, setIsFetching] = useState(false);
  const [specifications, setSpecifications] = useState(null);
  const [hasError, setHasError] = useState(false);

  const productLineLetter = getProductLineLetter.get(appName)[vehicleType] || getProductLineLetter.get(appName);

  const trimIds = trims?.join?.();

  const apiPath = `models/${productLineLetter}/${apiModes[pageState]}/trims/specs/withcategories?trimIds=${trimIds}&AcceptLanguage=${language}`;
  const apiUrl = `https://${apiHost}/${apiPath}`;

  useEffect(() => {
    const fetchSpecifications = async () => {
      try {
        const response = await axios.get(apiUrl);

        if (!response.data) {
          setSpecifications(null);
          return;
        }

        setSpecifications(camelcaseKeys(response.data, { deep: 'true' }));
        setIsFetching(false);
      } catch (err) {
        setHasError(true);
      }
    };

    fetchSpecifications();

    return undefined;
  }, [apiUrl]);

  return {
    specifications: formatter && specifications ? formatter(specifications) : specifications,
    isFetching,
    hasError,
  };
};

useSpecifications.propTypes = {
  trims: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.array, [PropTypes.string, PropTypes.number])),
  formatter: PropTypes.func,
};

export default useSpecifications;
