import { useContext, useEffect, useState } from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { UserLocationContext } from '@honda-canada/user-location';
import axios from 'axios';
import { ACURA_SITE_NAME, apiModes } from '../../utils/constants';

const OffersProvider = ({ transmissionKey, children, sitecoreContext, shouldFetch = true }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [hasOffers, setHasOffers] = useState(null);
  const [hasError, setHasError] = useState(null);
  const { language, pageState, settings } = sitecoreContext;
  const defaultProvince = settings?.defaultProvince;
  const userLocationContext = useContext(UserLocationContext);
  const { provinceCode, isFetchingUserLocation } = userLocationContext;
  const appName = sitecoreContext?.site?.name;
  const apiHost = sitecoreContext?.hondaRestApiHost;
  const apiPath = `models/${appName === ACURA_SITE_NAME ? 'A' : 'H'}/${
    apiModes[pageState]
  }/BuildAndPrice/offers/${transmissionKey}/province/${provinceCode || defaultProvince}?AcceptLanguage=${language}`;
  const apiUrl = `https://${apiHost}/${apiPath}`;

  useEffect(() => {
    if (!transmissionKey || isFetchingUserLocation) return undefined;

    setIsFetching(true);

    const fetchOffers = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (!response.data) {
          setHasOffers(false);
          setIsFetching(false);
          return;
        }

        const offers = response?.data[0]?.IncentiveOffers;
        if (offers?.Cash > 0 || offers?.Lease > 0 || offers?.Finance) {
          setHasOffers(true);
          setIsFetching(false);
        }
      } catch (err) {
        setHasError(true);
        setIsFetching(false);
      }
    };
    if (shouldFetch) fetchOffers();

    return undefined;
  }, [transmissionKey, apiUrl, isFetchingUserLocation, shouldFetch]);

  return children ? children({ hasOffers, isFetching, hasError }) : null;
};

export default withSitecoreContext()(OffersProvider);
