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

export const getSitecoreId = (models, modelKey, modelYear, trimKey, currentTransmissionKey) => {
  const model = models?.[0]?.items.find(item => item.detKey === modelKey);
  if (!model) return '';

  const year = model?.modelYears?.find(item => item.detIdentifier === modelYear);
  if (!year) return '';

  const trim = year?.trims?.find(item => item.detKey === trimKey);
  if (!trim) return '';

  const transmission = trim?.transmissions?.[0]?.items?.find(item => item.detKey === currentTransmissionKey);

  return transmission?.id;
};
