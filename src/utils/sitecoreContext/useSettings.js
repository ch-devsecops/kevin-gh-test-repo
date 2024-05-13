import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns settings from Sitecore Context
 * @returns {object} Current settings
 */

const useSettings = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.settings ?? {};
};

export default useSettings;
