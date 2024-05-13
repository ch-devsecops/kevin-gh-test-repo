import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * This hook return is Page Editing view
 * @returns {string} Current site name
 */

const usePageEditing = () => {
  const { sitecoreContext } = useSitecoreContext() || {};
  return sitecoreContext?.pageEditing;
};

export default usePageEditing;
