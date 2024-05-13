import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns Site name from Sitecore Context
 * @returns {string} Current site name
 */

const useAppName = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.site?.name;
};

export default useAppName;
