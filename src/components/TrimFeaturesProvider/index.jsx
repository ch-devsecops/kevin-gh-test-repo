import { useState, useEffect } from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';
import { apiModes, ACURA_SITE_NAME } from '../../utils/constants';

const TrimFeaturesProvider = ({ trims = [], sitecoreContext, children, formatter }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [features, setFeatures] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { language, pageState } = sitecoreContext;
  const trimIds = trims.join(';');
  const appName = sitecoreContext.site.name;
  const apiHost = sitecoreContext.hondaRestApiHost;
  const apiPath = `models/${appName === ACURA_SITE_NAME ? 'A' : 'H'}/${
    apiModes[pageState]
  }/trims/features/search?trimIds=${trimIds}&AcceptLanguage=${language}`;
  const apiUrl = `https://${apiHost}/${apiPath}`;

  useEffect(() => {
    const fetchTrimFeatures = async () => {
      try {
        const response = await axios.get(apiUrl);

        if (!response.data) {
          setFeatures(null);
          return;
        }

        setFeatures(camelcaseKeys(response.data, { deep: 'true' }));
        setIsFetching(false);
      } catch (err) {
        setHasError(true);
      }
    };

    fetchTrimFeatures();

    return undefined;
  }, [apiUrl]);

  return children
    ? children({
        features: formatter && features ? formatter(features) : features,
        isFetching,
        hasError,
      })
    : null;
};

export default withSitecoreContext()(TrimFeaturesProvider);
