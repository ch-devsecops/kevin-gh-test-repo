import { getComponentFromRoute } from '../../utils/sitecorePlaceholders';
import { PSP_SITE_NAME } from '../../utils/constants';

/**
 * @param {Object} sitecoreContext
 * @param {Object} sitecoreContext.route
 * @param {string} sitecoreContext.language
 * @param {Array} sitecoreContext.languageSelectors
 * @returns year from the current path, or the first item in the ModelPageNav years
 */
export const getModelYear = ({ route, language, languageSelectors }) => {
  const modelPageNavComponent = getComponentFromRoute('ModelPageNav', route);
  const modelPageNavFields = modelPageNavComponent?.fields?.data?.value;
  const currentPath = languageSelectors && languageSelectors.find(l => l.code === language)?.url;
  const modelPageNavYears = modelPageNavFields?.years?.items || [];
  const modelYearFromPath = currentPath && modelPageNavYears.find(y => currentPath.includes(y.name))?.name;

  return modelYearFromPath || modelPageNavYears[0]?.name;
};

/**
 * @param {Object} sitecoreContext
 * @param {Object} sitecoreContext.route
 * @param {string} appName
 * @returns model key from the ModelPageNav modelPageSettings fields
 */
export const getModelKeyFromRoute = ({ route }, appName) => {
  const modelPageNavComponent = getComponentFromRoute('ModelPageNav', route);
  const modelPageNavFields = modelPageNavComponent?.fields?.data?.value;

  switch (appName) {
    case PSP_SITE_NAME:
      return modelPageNavFields?.modelPageSettings?.modelCategory?.fields?.name;
    default:
      return modelPageNavFields?.modelPageSettings?.model?.fields?.detKey?.value;
  }
};

/**
 * @param {Object} sitecoreContext
 * @param {Object} sitecoreContext.route
 * @returns Boolean representation of isDarkMode from the ModelPageNav modelPageSettings fields
 */
export const getIsDarkFromRoute = ({ route }) => {
  const modelPageNavComponent = getComponentFromRoute('ModelPageNav', route);
  const modelPageNavFields = modelPageNavComponent?.fields?.data?.value;

  return modelPageNavFields?.modelPageSettings?.isDarkMode?.value === '1';
};
