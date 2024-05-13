import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns pageState from Sitecore Context
 * @returns {string} Current pageState
 */

const usePageState = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.pageState;
};

export default usePageState;
