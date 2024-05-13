/* eslint-disable import/prefer-default-export */
import { variant1, variant2 } from './constants';

/**
 * Stores a variety of props which change value depending on what site the user is on
 *
 * @param {variant} string - String containing the variant name
 *  @returns {object} - Returns an object containing the prop values based on the variant
 */
export const useConfiguration = variant => {
  switch (variant) {
    // HONDA_SITE_NAME
    case variant1:
      break;

    // ACURA_SITE_NAME
    case variant2:
      break;

    default:
      break;
  }

  return {};
};
