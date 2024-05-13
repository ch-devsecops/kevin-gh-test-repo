import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { LANGUAGE_EN } from '../constants';

/**
 * This hook returns language from Sitecore Context
 * @returns {string} Current language
 */

const useLanguage = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.language ?? LANGUAGE_EN; // default language
};

export default useLanguage;
