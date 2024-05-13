import { ENGINE_SITE_NAME, MARINE_SITE_NAME } from '../../utils/constants';
import { getGtmTagValue } from '../../utils/gtmEvents';

/**
 * Creates GTM attributes for a productName
 * @param {string} productName
 * @param {object} gtmTags
 * @returns gtmAttributes
 */
export const getProductLineGtmTags = (productName, gtmTags) => {
  switch (productName) {
    case MARINE_SITE_NAME:
      return Object.freeze({
        'data-gtm-interaction-type': 'cta: find a dealer',
        'data-gtm-component-type': getGtmTagValue(gtmTags?.componentName),
        'data-gtm-title': 'find a dealer',
      });
    default:
      return Object.freeze({
        'data-gtm-interaction-type': getGtmTagValue(gtmTags?.interactionType),
        'data-gtm-title': getGtmTagValue(gtmTags?.title),
        'data-gtm-component-type': getGtmTagValue(gtmTags?.componentName),
        'data-gtm-body-style': getGtmTagValue(gtmTags?.gtmSeriesName),
        'data-gtm-model': getGtmTagValue(gtmTags?.gtmCrankshaftName),
        'data-gtm-trim': getGtmTagValue(gtmTags?.gtmTrimName),
      });
  }
};

/**
 * Creates product line gtm tags
 * @productName {string} The name of the productLine used
 * @gtmTags {object} The gtmTags object
 * @checkCompare {boolean} The status of the compare button
 * @returns The gtmTags for productLine.
 */
export const getAddToCompareProductLineGtmTags = (appName, gtmTags, checkCompare) => {
  // eslint-disable-next-line default-case
  switch (appName) {
    case MARINE_SITE_NAME:
      return Object.freeze({
        'data-gtm-component-type': getGtmTagValue(gtmTags?.componentName),
        'data-gtm-interaction-type': 'cta: compare',
        'data-gtm-title': getGtmTagValue(gtmTags?.addTitle),
      });
    case ENGINE_SITE_NAME:
      return Object.freeze({
        'data-gtm-interaction-type': getGtmTagValue(gtmTags?.removeInteractionType),
        'data-gtm-title': getGtmTagValue(checkCompare ? gtmTags?.removeTitle : gtmTags?.addTitle),
        'data-gtm-component-type': getGtmTagValue(gtmTags?.componentName),
        'data-gtm-body-style': getGtmTagValue(gtmTags?.gtmSeriesName),
        'data-gtm-model': getGtmTagValue(gtmTags?.gtmCrankshaftName),
        'data-gtm-trim': getGtmTagValue(gtmTags?.gtmTrimName),
      });
  }
};
