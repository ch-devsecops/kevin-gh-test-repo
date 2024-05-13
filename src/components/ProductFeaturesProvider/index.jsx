import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import axios from 'axios';

import { apiModes } from '../../utils/constants';
import getProductLineLetter from '../../utils/api/getProductLineLetter';

const FeaturesProvider = ({ trimId, sitecoreContext, children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [features, setFeatures] = useState(null);
  const [hasError, setHasError] = useState(false);

  const {
    language,
    pageState,
    hondaRestApiHost: apiHost,
    site: { name: appName },
  } = sitecoreContext;
  const apiPath = `models/${getProductLineLetter.get(appName)}/${
    apiModes[pageState]
  }/trims/${trimId}?AcceptLanguage=${language}`;
  const apiUrl = `https://${apiHost}/${apiPath}`;

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get(apiUrl);

        if (!response.data) {
          setFeatures(null);
          return;
        }

        setFeatures(response.data);
        setIsFetching(false);
      } catch (err) {
        setHasError(true);
      }
    };

    fetchFeatures();

    return undefined;
  }, [apiUrl]);

  return children ? children({ features, isFetching, hasError }) : null;
};

FeaturesProvider.propTypes = {
  trimId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sitecoreContext: PropTypes.shape({
    language: PropTypes.string,
    hondaRestApiHost: PropTypes.string,
    pageState: PropTypes.string,
    site: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  children: PropTypes.func,
};

export default withSitecoreContext()(FeaturesProvider);
