import { chevronColourTokenForParam, colourTokenForParam, foregroundColourTokenForParam } from '../sitecoreFields';

/**
 * returns design-system-react theme background color token for a given backend color token
 * @param isDark
 * @param paramColorToken
 * @returns {*|string}
 */
export const getBackgroundColorToken = (isDark, paramColorToken) => {
  if (isDark) return 'black';
  if (!paramColorToken) return 'white';
  if (paramColorToken in colourTokenForParam) return colourTokenForParam[paramColorToken];
};

/**
 * returns design-system-react theme foreground color token for a given backend color token
 * @param isDark
 * @param paramColorToken
 * @returns {*|string}
 */
export const getForegroundColorToken = (isDark, paramColorToken) => {
  if (isDark) return 'white';
  if (!paramColorToken) return 'black';
  if (paramColorToken in foregroundColourTokenForParam) return foregroundColourTokenForParam[paramColorToken];
};

/**
 * returns design-system-react theme icon color token for a given backend color token
 * @param isDark
 * @param paramColorToken
 * @returns {*|string}
 */
export const getIconColorToken = (isDark, paramColorToken) => {
  if (isDark) return 'grey.2';
  if (!paramColorToken) return 'grey.0';
  if (paramColorToken in chevronColourTokenForParam) return chevronColourTokenForParam[paramColorToken];
};
