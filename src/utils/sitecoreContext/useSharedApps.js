import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns baseUrl for a given name in the sharedApps array (i.e., part of SitecoreContext).
 * @param {string}  urlName
 * @returns {string} corresponding baseUrl in sharedApps
 */

const useSharedApps = urlName => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.sharedApps?.find(app => app.name === urlName)?.baseUrl;
};

export default useSharedApps;
