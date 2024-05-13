/**
 * @param {Object} route - from Sitecore context
 * @returns the first placeholder with 'main' in its name
 */
export const getMainPlaceholderComponentsFromRoute = (route = {}) => {
  const placeholderKeys = route.placeholders ? Object.keys(route?.placeholders) : [];
  const mainPlaceholderIndex = placeholderKeys?.find(key => key.includes('main'));

  return mainPlaceholderIndex && route?.placeholders[mainPlaceholderIndex];
};

/**
 * @param {string} componentName - name of a Sitecore component
 * @param {Object} route - from Sitecore context; Must include a placeholder with 'main' in its name
 * @returns The first component from the route's main placeholder that has the provided name
 */
export const getComponentFromRoute = (componentName, route) => {
  const components = getMainPlaceholderComponentsFromRoute(route);

  return components && components.find(c => c.componentName === componentName);
};
