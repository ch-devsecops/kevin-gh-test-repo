import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns Sitecore API Key from Sitecore Context
 * @returns {string} Sitecore API Key
 */

const useAppName = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.sitecoreApiKey;
};

export default useAppName;
