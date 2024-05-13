import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook returns SOT Honda Experience API configuration from Sitecore Context
 * @returns {object} SOT Honda Exp API config
 */

const useSotHondaExpApiConfig = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.sotHondaExperienceApiConfig;
};

export default useSotHondaExpApiConfig;
