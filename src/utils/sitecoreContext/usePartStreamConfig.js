import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns part stream env. variables (id, appKey, host) from Sitecore Context
 * @returns {object} Current settings
 */

const usePartStreamConfig = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.partStreamConfig ?? {};
};

export default usePartStreamConfig;
