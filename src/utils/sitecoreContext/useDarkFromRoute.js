import useRoute from './useRoute';

/**
 * This hook returns isDarkMode truthy value from Sitecore Context Route
 * @returns {boolean} truthy value of isDarkMode
 */

const useDarkFromRoute = () => {
  const route = useRoute();
  return route?.fields?.isDarkMode?.value;
};

export default useDarkFromRoute;
