import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';

import { apiModes } from '../../utils/constants';
import getProductLineLetter from '../../utils/api/getProductLineLetter';

const SpecificationsProvider = ({ trims = [], sitecoreContext, children, formatter }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [specifications, setSpecifications] = useState(null);
  const [hasError, setHasError] = useState(false);

  const trimIds = trims.join();

  const {
    language,
    pageState,
    hondaRestApiHost: apiHost,
    site: { name: appName },
  } = sitecoreContext;
  const apiPath = `models/${getProductLineLetter.get(appName)}/${
    apiModes[pageState]
  }/trims/specs/withcategories?trimIds=${trimIds}&AcceptLanguage=${language}`;
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

  return children
    ? children({
        specifications: formatter && specifications ? formatter(specifications) : specifications,
        isFetching,
        hasError,
      })
    : null;
};

SpecificationsProvider.propTypes = {
  trims: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.array, [PropTypes.string, PropTypes.number])),
  sitecoreContext: PropTypes.shape({
    language: PropTypes.string,
    hondaRestApiHost: PropTypes.string,
    pageState: PropTypes.string,
    site: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  formatter: PropTypes.func,
  children: PropTypes.func,
};

export default withSitecoreContext()(SpecificationsProvider);
