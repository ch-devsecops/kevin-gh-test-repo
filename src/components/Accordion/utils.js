import { ENGINE_SITE_NAME, MARINE_SITE_NAME } from '../../utils/constants';
import { getGtmTagValue } from '../../utils/gtmEvents';

/**
 * Creates GTM attributes for a productName
 * @param {string} productName
 * @param {object} gtmTags
 * @returns gtmAttributes
 */
export const getAccordionGtmTagsByProductName = ({ appName, gtmTags }) => {
  switch (appName) {
    case MARINE_SITE_NAME:
      return Object.freeze({
        'data-gtm-interaction-type': 'primary model nav',
        'data-gtm-component-type': getGtmTagValue(gtmTags?.componentName),
        'data-gtm-title': getGtmTagValue(gtmTags?.gtmTitle),
        'data-gtm-accordion-level': 'L1',
      });
    case ENGINE_SITE_NAME:
      return Object.freeze({
        'data-gtm-interaction-type': getGtmTagValue(gtmTags?.interactionType),
        'data-gtm-title': getGtmTagValue(gtmTags?.gtmTitle),
        'data-gtm-component-type': getGtmTagValue(gtmTags?.componentName),
        'data-gtm-body-style': getGtmTagValue(gtmTags?.bodyStyle),
        'data-gtm-model': getGtmTagValue(gtmTags?.modelName),
        'data-gtm-trim': getGtmTagValue(gtmTags?.trimName),
      });
    default:
      return {};
  }
};

export const getGtmTags = (category, componentName) =>
  Object.freeze({
    'data-gtm-category': getGtmTagValue(category),
    'data-gtm-component-type': getGtmTagValue(componentName),
  });
