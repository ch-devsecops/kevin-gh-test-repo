import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const SitecoreLayoutServiceProvider = ({ itemPath, formatter, children, sitecoreContext }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState(null);
  const [hasError, setHasError] = useState(false);
  const scSite = sitecoreContext.site.name;
  const context = isDev
    ? {
        ...sitecoreContext,
        sitecoreApiKey: '4AB8BBA7-4E98-4732-9789-FE5970B415A6',
        layoutServiceRoute: '/sitecore/api/layout/render/jss',
      }
    : sitecoreContext;
  const { language, sitecoreApiKey, layoutServiceRoute, pageState } = context;
  const scModeParam = pageState === 'preview' || pageState === 'edit' ? '&sc_mode=preview' : '';
  const url = `${layoutServiceRoute}?item=${itemPath}&sc_lang=${language}&sc_apikey=${sitecoreApiKey}&sc_site=${scSite}${scModeParam}`;

  useEffect(() => {
    setIsFetching(true);

    const fetchLayoutServiceItem = async () => {
      try {
        const layoutServiceResponse = await axios(url);

        if (layoutServiceResponse?.data) {
          const { data } = layoutServiceResponse;
          setResponse(data);
        } else {
          setHasError(true);
        }
        setIsFetching(false);
      } catch (err) {
        setHasError(true);
        setIsFetching(false);
      }
    };

    fetchLayoutServiceItem();

    return undefined;
  }, [url]);

  return children
    ? children({
        response: response && formatter ? formatter(response) : response,
        isFetching,
        hasError,
      })
    : null;
};

SitecoreLayoutServiceProvider.propTypes = {
  itemPath: PropTypes.string,
  formatter: PropTypes.func,
  children: PropTypes.func,
};

export default withSitecoreContext()(SitecoreLayoutServiceProvider);
