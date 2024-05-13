import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';
import { UserLocationContext } from '@honda-canada/user-location';
import getFinancialsApiPath from './utils';

const FinancialsProvider = ({
  models,
  formatter,
  children,
  sitecoreContext,
  isSellingPriceProvince,
  shouldFetch = true,
  vehicleType,
}) => {
  const [isFetching, setIsFetching] = useState(true);
  const [financials, setFinancials] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { site, hondaRestApiHost, pageState, settings } = sitecoreContext || {};
  const defaultProvince = settings?.defaultProvince;
  const userLocationContext = useContext(UserLocationContext);
  const { provinceCode, isFetchingUserLocation } = userLocationContext || {};
  const appName = site?.name;
  const modelData = JSON.stringify(models);
  const apiPath = getFinancialsApiPath(appName, pageState, vehicleType);
  const apiUrl = `https://${hondaRestApiHost}/${apiPath}/${provinceCode || defaultProvince}`;

  useEffect(() => {
    if (isFetchingUserLocation) return undefined;
    setIsFetching(true);

    const fetchFinancials = async () => {
      try {
        const response = await axios.post(apiUrl, models);

        if (response?.data) {
          setFinancials(camelcaseKeys(response.data, { deep: 'true' }));
        } else {
          setHasError(true);
        }
        setIsFetching(false);
      } catch (err) {
        setHasError(true);
        setIsFetching(false);
      }
    };

    if (shouldFetch) fetchFinancials();

    return undefined;
    // modelData is a string stringified models array
  }, [modelData, apiUrl, isFetchingUserLocation, shouldFetch]);

  return children
    ? children({
        financials: formatter && financials ? formatter(financials, isSellingPriceProvince) : financials,
        isFetching,
        hasError,
      })
    : null;
};

FinancialsProvider.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      modelKey: PropTypes.string,
      modelYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      modelCode: PropTypes.string,
    }),
  ),
  formatter: PropTypes.func,
  children: PropTypes.func,
  shouldFetch: PropTypes.bool,
  isSellingPriceProvince: PropTypes.bool,
};

export default withSitecoreContext()(FinancialsProvider);
