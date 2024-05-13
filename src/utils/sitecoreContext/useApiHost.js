import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns hondaRestApiHost from Sitecore Context
 * @returns {string} Current hondaRestApiHost
 */

const useApiHost = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.hondaRestApiHost;
};

export default useApiHost;
