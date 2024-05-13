import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns Sitecore API Host from Sitecore Context
 * @returns {string} Sitecore API URL
 */

const useSitecoreApiHost = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.localhostSitecoreApiHost;
};

export default useSitecoreApiHost;
