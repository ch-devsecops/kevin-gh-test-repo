import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns route from Sitecore Context
 * @returns {object} Current route
 */

const useRoute = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.route ?? {};
};

export default useRoute;
