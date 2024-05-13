import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns provinces from Sitecore Context
 * @returns {object} Current provinces
 */

const useProvinces = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.provinces ?? {};
};

export default useProvinces;
