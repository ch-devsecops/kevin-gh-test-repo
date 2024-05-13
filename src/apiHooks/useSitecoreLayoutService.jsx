import { useState, useEffect } from 'react';
import axios from 'axios';

// TODO: sitecore-jss-react@19 implements useSitecoreContext hook,
// so consuming components won't have to provide sitecoreContext.
const useSitecoreLayoutService = (itemPath, sitecoreContext, formatter) => {
  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState(null);
  const [placeholderName, setPlaceholderName] = useState(null);
  const [hasError, setHasError] = useState(false);
  const scSite = sitecoreContext.site.name;
  const { language, localhostSitecoreApiHost, sitecoreApiKey, layoutServiceRoute, pageState } = sitecoreContext;
  const scModeParam = pageState === 'preview' || pageState === 'edit' ? '&sc_mode=preview' : '';
  const url = `${
    localhostSitecoreApiHost || ''
  }${layoutServiceRoute}?item=${itemPath}&sc_lang=${language}&sc_apikey=${sitecoreApiKey}&sc_site=${scSite}${scModeParam}`;

  useEffect(() => {
    if (!itemPath) {
      return;
    }

    setIsFetching(true);

    const fetchLayoutServiceItem = async () => {
      try {
        const layoutServiceResponse = await axios(url);

        if (layoutServiceResponse?.data) {
          const { data } = layoutServiceResponse;
          setResponse(data);
          const placeholderKeys = Object.keys(data.sitecore?.route?.placeholders);

          // By convention, the routes we consume asyncronously
          // have only one placeholder
          setPlaceholderName(placeholderKeys[0]);
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
  }, [url]);

  return {
    response: response && formatter ? formatter(response) : response,
    placeholderName,
    isFetching,
    hasError,
  };
};

export default useSitecoreLayoutService;
