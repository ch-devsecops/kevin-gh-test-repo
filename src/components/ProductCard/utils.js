import { EngineSeriesCard } from '../../utils/constants';
import { getGtmTagValue } from '../../utils/gtmEvents';

export const variant1 = 'variant1';
export const variant2 = 'variant2';
export const variant3 = 'variant3';

export const useConfiguration = variant => {
  let imageOrder = '-1';
  let showPricing;
  let bodyMarginTop;
  let bodySize;
  let wrapperMaxWidth;
  let ctaButtonDisplay;
  let compareLabelFontSize = 'small';
  let compareLabelLineHeight = 'md';
  let priceComponentStyles = {
    pricesContainer: {
      flexDirection: 'column',
      gap: 's',
      pb: 'default',
    },
    priceStyles: {
      title: {
        styles: {
          width: undefined,
        },
      },
      copy: {
        styles: {
          fontSize: ['18px', '18px', '18px'],
          lineHeight: ['22px', '22px', '22px'],
        },
      },
    },
    errorStyles: {
      container: {
        pb: 'default',
        pt: 'xxs',
      },
    },
    saveStyles: {
      container: {
        mx: 'auto',
      },
    },
  };

  switch (variant) {
    case variant1:
      ctaButtonDisplay = ['none', 'block'];
      wrapperMaxWidth = ['130px', '295px'];
      break;

    case variant2:
      imageOrder = '0';
      showPricing = true;
      bodyMarginTop = 'default';
      bodySize = 'small';
      priceComponentStyles = {
        priceStyles: {
          copy: {
            styles: {
              fontSize: ['18px', '18px', '18px'],
              lineHeight: ['22px', '22px', '22px'],
            },
          },
        },
        saveStyles: {
          copy: {
            styles: {
              fontSize: ['14px', '14px', '14px'],
            },
          },
        },
      };
      break;

    case variant3:
      ctaButtonDisplay = ['none', 'block'];
      wrapperMaxWidth = ['130px', '295px'];
      compareLabelFontSize = '14px';
      compareLabelLineHeight = '16px';
      imageOrder = '0';
      showPricing = true;
      bodyMarginTop = [undefined, undefined, 'default'];
      priceComponentStyles = {
        pricesContainer: {
          flexDirection: 'column',
          gap: 's',
          pb: 'default',
        },
        priceStyles: {
          title: {
            styles: {
              fontSize: ['10px', '14px'],
              lineHeight: ['14px', '24px'],
              width: 'max-content',
            },
          },
        },
        errorStyles: {
          container: {
            pb: 'default',
            pt: 'xxs',
          },
        },
        saveStyles: {
          container: {},
          copy: {
            styles: {
              fontSize: ['14px', '14px', '14px'],
            },
          },
        },
      };
      break;

    default:
      break;
  }
  return {
    imageOrder,
    showPricing,
    bodyMarginTop,
    bodySize,
    wrapperMaxWidth,
    ctaButtonDisplay,
    priceComponentStyles,
    compareLabelFontSize,
    compareLabelLineHeight,
  };
};

export const EXPLORE = 'explore';
export const CTA_EXPLORE = 'cta: explore';
export const CTA_COMPARE = 'cta: compare';
export const ENGINE_CTA_COMPARE = 'compare item click';
export const ADDED_COMPARISON_ITEM = 'added comparison item';
export const REMOVED_COMPARISON_ITEM = 'removed comparison item';
export const VIEW_DETAILS = 'view details';

export const gtmMarineMap = (fields, gtmTags) => {
  const tempGtmTags = {
    interactionType: gtmTags?.interactionType,
    componentName: gtmTags?.componentName,
    bodyStyle: gtmTags?.bodyStyle,
    model: fields?.modelName?.value,
    title: `marine product name ${fields?.name}`,
    trimName: fields?.name,
  };

  const gtmAttributes = {
    link: {
      'data-gtm-interaction-type': tempGtmTags?.interactionType || CTA_EXPLORE,
      'data-gtm-component-type': getGtmTagValue(tempGtmTags?.componentName),
      'data-gtm-body-style': getGtmTagValue(tempGtmTags?.bodyStyle),
      'data-gtm-model': getGtmTagValue(tempGtmTags?.model),
      title: getGtmTagValue(tempGtmTags?.title),
    },
    cta: {
      'data-gtm-interaction-type': tempGtmTags?.interactionType || CTA_EXPLORE,
      'data-gtm-component-type': getGtmTagValue(tempGtmTags?.componentName),
      'data-gtm-body-style': getGtmTagValue(tempGtmTags?.bodyStyle),
      'data-gtm-model': getGtmTagValue(tempGtmTags?.model),
      'data-gtm-title': VIEW_DETAILS,
    },
    compare: {
      'data-gtm-interaction-type': gtmTags?.compareInteractionType || CTA_COMPARE,
      'data-gtm-component-type': getGtmTagValue(tempGtmTags?.componentName),
      'data-gtm-body-style': getGtmTagValue(tempGtmTags?.bodyStyle),
      'data-gtm-model': getGtmTagValue(tempGtmTags?.model),
      'data-gtm-title': ADDED_COMPARISON_ITEM,
    },
  };

  return {
    gtmTags: gtmAttributes,
  };
};

export const gtmEngineMap = (fields, gtmTags) => {
  const gtmModel = fields?.crankshaftName || gtmTags?.crankshaftName;
  const gtmBodyStyle = fields?.seriesName || gtmTags?.gtmSeriesName || gtmTags?.seriesName;

  const tempGtmTags = {
    interactionType: gtmTags?.interactionType,
    componentName: gtmTags?.componentName,
    bodyStyle: gtmBodyStyle,
    model: gtmModel,
    title: gtmTags?.title || EngineSeriesCard?.Clicks?.DATA_GTM_TITLE,
    trimName: fields?.name,
  };

  const gtmAttributes = {
    link: {
      'data-gtm-interaction-type': EXPLORE,
      'data-gtm-component-type': getGtmTagValue(tempGtmTags?.componentName),
      'data-gtm-body-style': getGtmTagValue(tempGtmTags?.bodyStyle),
      'data-gtm-model': getGtmTagValue(tempGtmTags?.model),
      'data-gtm-trim': getGtmTagValue(tempGtmTags?.trimName),
      title: getGtmTagValue(tempGtmTags?.title),
    },
    cta: {
      'data-gtm-interaction-type': EXPLORE,
      'data-gtm-component-type': getGtmTagValue(tempGtmTags?.componentName),
      'data-gtm-body-style': getGtmTagValue(tempGtmTags?.bodyStyle),
      'data-gtm-model': getGtmTagValue(tempGtmTags?.model),
      'data-gtm-title': getGtmTagValue(tempGtmTags?.title),
      'data-gtm-trim': getGtmTagValue(tempGtmTags?.trimName),
    },
    compare: {
      'data-gtm-interaction-type': ENGINE_CTA_COMPARE,
      'data-gtm-component-type': getGtmTagValue(tempGtmTags?.componentName),
      'data-gtm-body-style': getGtmTagValue(tempGtmTags?.bodyStyle),
      'data-gtm-model': getGtmTagValue(tempGtmTags?.model),
      'data-gtm-title': getGtmTagValue(gtmTags?.compareTitle),
      'data-gtm-trim': getGtmTagValue(fields?.name),
    },
  };

  return {
    gtmTags: gtmAttributes,
  };
};
