import { useTranslation } from 'react-i18next';
import isValidUrlOrRelativeUrl from '@honda-canada/js-utilities/lib/isValidUrlOrRelativeUrl';

import { getTrimFilterValues } from '../../ModelFiltersContext/utils';
// Converts the Web Catalog version of a boolean value into an actual boolean value
import { parseBool } from '../../../utils/common';
import {
  emptyDataModel,
  emptyDataFields,
  emptyDataTrim,
  emptyModelYears,
  variant1,
  variant2,
  variant3,
  variant4,
  PAYMENT_FREQUENCY,
  PAYMENT_METHOD,
} from './constants';
import { isEmpty } from '../../../utils/object';

export const useConfiguration = (variant, priceLabels) => {
  const { t } = useTranslation();

  let collapseIfFilterChanged;
  let detailsCtaLabel = t('Shared.Common.viewTrimLabel');
  let exteriorDisclaimerMarginTop;
  let hasCompareButton = false;
  let isExpandedDefault = true;
  let isModelDetailsButton = false;
  let isUseLegacyPrice = true;
  let isUsePriceComponent = false;
  let mappedPriceLabels = priceLabels;
  let modelCardDescriptionFontSize;
  let modelCardDescriptionLineHeight;
  let modelCardDescriptionPath = 'data.value.category.fields.tagline.value';
  let modelCardTaglineComponent = 'h6';
  let onlyFilteredTrims = false;
  let priceDetKey = 'modelKey';
  let priceModelKey = 'defaultTransmission.item.fields.detIdentifier.value';
  let priceStyles = {};
  let productsComponent = 'trims';
  let showExpandButton = false;
  let showModelCardImage = true;
  let showDisclaimerAnchor;
  let showPaymentInfoTooltip = true;
  let trimAvailableTernary = t('Pages.Models.Exploration.trimAvailableLabel');
  let trimsAvailableTernary = t('Pages.Models.Exploration.trimsAvailableLabel');
  let successIconProps = {
    name: 'success',
    iconSize: 'large',
    iconColor: 'blue',
  };
  let trimCardAlignment = 'center';
  let shouldSplitModelYearsOnNewRow = false;
  let hasTrimCardGtmTags = false;
  let trimCardGtmInteractionType;

  switch (variant) {
    // HONDA_SITE_NAME
    case variant1:
      showExpandButton = true;
      isExpandedDefault = false;
      isUseLegacyPrice = false;
      successIconProps = {
        ...successIconProps,
        filled: true,
      };
      isUsePriceComponent = true;
      break;

    // ACURA_SITE_NAME
    case variant2:
      exteriorDisclaimerMarginTop = 'l';
      isUseLegacyPrice = false;
      successIconProps = {
        ...successIconProps,
        iconColor: 'white',
        background: 'blue',
      };
      isUsePriceComponent = true;
      break;

    // MARINE_SITE_NAME
    case variant3:
      mappedPriceLabels = {
        allInPrice: { label: t('Shared.Common.sellingPriceStartingFromLabel') },
      };
      collapseIfFilterChanged = true;
      isExpandedDefault = false;
      modelCardDescriptionFontSize = '14px';
      modelCardDescriptionLineHeight = '24px';
      modelCardTaglineComponent = 'h5';
      onlyFilteredTrims = true;
      priceDetKey = 'detModelKey.value';
      priceModelKey = 'detModelKey.value';
      productsComponent = 'products';
      showExpandButton = true;
      showPaymentInfoTooltip = false;
      showModelCardImage = false;
      trimAvailableTernary = t('Pages.Models.Exploration.modelAvailableLabel');
      trimsAvailableTernary = t('Pages.Models.Exploration.modelsAvailableLabel');
      break;

    // PSP_SITE_NAME
    case variant4:
      mappedPriceLabels = {
        allInPrice: { label: t('Shared.Common.sellingPriceStartingFromLabel') },
      };
      collapseIfFilterChanged = false;
      hasCompareButton = true;
      isExpandedDefault = false;
      isModelDetailsButton = true;
      isUsePriceComponent = true;
      modelCardDescriptionFontSize = '14px';
      modelCardDescriptionLineHeight = '24px';
      modelCardDescriptionPath = 'data.value.category.fields.description';
      modelCardTaglineComponent = 'h5';
      onlyFilteredTrims = false;
      showPaymentInfoTooltip = false;
      productsComponent = 'trims';
      isUsePriceComponent = true;
      isUseLegacyPrice = false;
      detailsCtaLabel = t('Pages.Models.Exploration.viewModelDetailsButton');
      isModelDetailsButton = true;
      successIconProps = {
        ...successIconProps,
        iconColor: 'red',
      };
      showExpandButton = true;
      showModelCardImage = false;
      showDisclaimerAnchor = true;
      trimAvailableTernary = t('Pages.Models.Exploration.modelAvailableLabel');
      trimsAvailableTernary = t('Pages.Models.Exploration.modelsAvailableLabel');
      priceStyles = {
        priceStyles: {
          title: {
            size: 'extraSmall',
          },
        },
      };
      trimCardAlignment = 'left';
      shouldSplitModelYearsOnNewRow = true;
      hasTrimCardGtmTags = true;
      trimCardGtmInteractionType = 'cta: explore';
      break;

    default:
      break;
  }

  /**
   * @param {Boolean} showExpandButton
   * @param {Boolean} isExpandedDefault
   * @param {String} exteriorDisclaimerMarginTop - style for ExteriorColor
   * @param {Boolean} collapseIfFilterChanged
   * @param {Boolean} onlyFilteredTrims
   *
   * @param {Object} hondaExpandProps
   * @param {Dictionary} trimsAvailableTernary - dictionary value for ModelCard expand Button
   * @param {Dictionary} trimAvailableTernary - dictionary value for Trim
   *
   * @param {Object} modelCardProps
   * @param {Boolean} showModelCardImage
   * @param {Boolean} modelCardTaglineComponent - Header type for ModelCard
   * @param {Boolean} modelCardDescriptionLineHeight - style for ModelCard
   * @param {Boolean} modelCardDescriptionFontSize - style for ModelCard
   *
   * @param {'products'|'trim'} productsComponent - type for product component
   * @param {String} priceDetKey - path to get properly `detKey`
   * @param {String} priceModelKey - path to get properly `modelKey`
   *
   * @param {Boolean} isModelDetailsButton
   * @param {Boolean} hasCompareButton
   *
   * @param {Object} successIconProps
   *
   * @param {Boolean} hasTrimCardGtmTags
   * @param {String} trimCardGtmInteractionType
   */
  return {
    collapseIfFilterChanged,
    detailsCtaLabel,
    exteriorDisclaimerMarginTop,
    hasCompareButton,
    isExpandedDefault,
    isModelDetailsButton,
    isUseLegacyPrice,
    isUsePriceComponent,
    modelCardDescriptionPath,
    onlyFilteredTrims,
    priceDetKey,
    priceLabels: mappedPriceLabels,
    priceModelKey,
    priceStyles,
    productsComponent,
    showExpandButton,
    showPaymentInfoTooltip,
    showDisclaimerAnchor,
    hondaExpandProps: {
      trimsAvailableTernary,
      trimAvailableTernary,
    },
    modelCardProps: {
      showModelCardImage,
      modelCardTaglineComponent,
      modelCardDescriptionLineHeight,
      modelCardDescriptionFontSize,
    },
    successIconProps,
    trimCardAlignment,
    shouldSplitModelYearsOnNewRow,
    hasTrimCardGtmTags,
    trimCardGtmInteractionType,
  };
};

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Recursively function that merge objects deeply without any lost or new properties
 * I try use lodash and many other solution... this is a best
 * @param {*} sources - Main Object
 * @param  {...any} target - part of object properties
 * @returns merged Main Object and sources
 */
export function mergeDeep(sources, type, ...target) {
  /* eslint-disable no-param-reassign, no-restricted-syntax */
  switch (type) {
    // ! Field exceptions
    case 'fields':
      if (target?.[0]?.heroImage && !sources?.heroImage?.item?.value?.src) {
        sources.heroImage = {
          item: {
            value: {
              ...sources?.desktopImage?.item?.value,
              src: [
                `url(${
                  isValidUrlOrRelativeUrl(sources?.mobileImage?.item?.value?.src)
                    ? sources?.mobileImage?.item?.value?.src
                    : ''
                })`,
                `url(${
                  isValidUrlOrRelativeUrl(sources?.desktopImage?.item?.value?.src)
                    ? sources?.desktopImage?.item?.value?.src
                    : ''
                })`,
              ],
            },
          },
        };
        sources.model = sources?.category;
      }
      break;
    // ! Category exceptions
    case 'category':
      if (target?.[0]?.defaultYear) {
        sources.modelName = { value: sources?.categoryName?.value, qwe: 1111 };
        sources.name = sources?.categoryName?.value;
        sources.detKey = { value: sources?.categoryName?.value };
        sources.modelYears = [];
      }
      break;
    // ! Model exceptions
    case 'model':
      if (target?.[0]?.defaultYear) {
        sources.modelName = { value: sources?.categoryName?.value };
        sources.name = sources?.categoryName?.value;
        sources.detKey = { value: sources?.categoryName?.value };
        sources.modelYears = sources?.modelYears || [];
      }
      break;
    // ! Trim exceptions
    case 'trim':
      if (sources.name) {
        sources.trimName = { value: sources?.name };
      }
      if (target?.[0]?.primaryThumbnail) {
        sources.primaryThumbnail = { item: { value: sources?.thumbnail?.value?.images?.[0] } };
        sources.trimName = { value: sources?.name };
      }
      break;
    default:
      break;
  }
  if (!target.length) return sources;
  const source = target.shift();

  if (isObject(sources) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!sources[key]) Object.assign(sources, { [key]: {} });
        mergeDeep(sources[key], type, source[key]);
      } else {
        Object.assign(sources, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(sources, type, ...target);
  /* eslint-enable */
}

/**
 * mapMarineFields Function that create Object like
 * @param {*} fields - from sitecore component
 * @returns mapped input fields
 */
export const mapMarineFields = fields => {
  const mappedModels =
    fields?.data?.value?.category?.fields?.models?.map(model => mergeDeep(model, 'trim', emptyDataTrim)) || [];

  const mappedCategory = mergeDeep(fields?.data?.value?.category || {}, 'model', emptyDataModel);
  const modelYearsObj = {
    tagline: { value: mappedCategory?.fields?.categoryName?.value },
    trims: mappedModels,
    detKey: { value: mappedCategory?.fields?.categoryName?.value },
    modelKey: { value: mappedCategory?.fields?.categoryName?.value },
  };

  if (mappedCategory?.fields?.modelYears?.length > 0) {
    mappedCategory.fields.modelYears = mappedCategory?.fields?.modelYears?.map(modelYear => ({
      ...emptyModelYears,
      ...modelYearsObj,
      ...modelYear,
    }));
  } else {
    mappedCategory?.fields?.modelYears?.push({
      ...emptyModelYears,
      ...modelYearsObj,
    });
  }

  const mappedFields = mergeDeep(fields, 'fields', emptyDataFields);
  mappedFields.data.value.model = mappedCategory;

  return mappedFields;
};

/**
 * mapMarineFields Function that create Object like
 * @param {*} fields - from sitecore component
 * @returns mapped input fields
 */
export const mapPSPFields = fields => {
  if (fields === null || isEmpty(fields)) {
    return {};
  }
  const mappedCategory = mergeDeep(fields?.data?.value?.category || {}, 'model', emptyDataModel);
  mappedCategory.fields.description = mappedCategory.fields?.description
    ? mappedCategory.fields.description
    : fields.data.value.category.fields?.modelYears?.[0]?.tagline?.value;
  const mappedModelsYears = fields?.data?.value?.category?.fields?.modelYears.map(modelYear => {
    let trims = [];
    modelYear?.models?.forEach(model => {
      const detKey = model?.detKey?.value;
      const modelTrims = model?.trims?.map(trim => ({
        ...trim,
        defaultTransmission: { item: trim.defaultTransmission },
        modelKey: detKey,
      }));
      trims = [...trims, ...modelTrims];
    });
    const detKey = modelYear?.models?.[0]?.detKey?.value;
    mappedCategory.fields.detKey.value = detKey;
    return {
      ...modelYear,
      trims,
      tagline: { value: mappedCategory?.fields?.categoryName?.value },
    };
  });

  mappedCategory.fields.modelYears = mappedModelsYears;

  const mappedFields = mergeDeep(fields, 'fields', emptyDataFields);
  mappedFields.data.value.model = mappedCategory;
  mappedFields.data.value.paymentMethod = { value: PAYMENT_METHOD }; // by default for psp || 'finance';
  mappedFields.data.value.paymentFrequency = { value: PAYMENT_FREQUENCY }; // by default for psp || 'weekly';

  return mappedFields;
};

export const getModelKey = catalogData => catalogData?.value?.model?.fields?.detKey?.value;

export const shouldUseDefaultModelYear = catalogData => parseBool(catalogData?.value?.shouldUseDefaultModelYear?.value);

export const getDefaultModelYear = catalogData => catalogData?.value?.model?.fields?.defaultYear?.fields?.year?.value;

export const getActiveModelYear = catalogData =>
  shouldUseDefaultModelYear(catalogData) ? getDefaultModelYear(catalogData) : null;

export const getActiveModelYears = catalogData => {
  const activeModelYear = getActiveModelYear(catalogData);
  return activeModelYear
    ? [activeModelYear]
    : catalogData?.value?.model?.fields?.modelYears?.filter(my => my.year?.value).map(my => my.year?.value);
};

export const getTrimPricing = (financials, trim, isFetching, hasError) => {
  if (hasError) {
    return { pricing: { hasError } };
  }

  if (isEmpty(financials)) {
    return null;
  }

  const financialsModel = financials?.models.find(
    m => m.modelKey === trim?.modelKey && m?.trims?.find(t => t.key === trim?.key),
  );
  const financialsTrim = financialsModel?.trims?.find(t => t.key === trim?.key);

  const transmission = financialsTrim?.transmissions.find(t => t.key === trim?.defaultTransmissionKey);

  // eslint-disable-next-line no-nested-ternary
  const color = trim?.defaultTransmission?.defaultExteriorColorKey
    ? transmission?.exteriorColors.find(c => c.key === trim?.defaultTransmission?.defaultExteriorColorKey)
    : transmission?.exteriorColors?.[0] || null;

  if (!color) return null;

  return {
    freightPdiCost: trim?.freightPdiCost,
    levyTotal: transmission?.levyTotal,
    pricing: {
      msrp: color?.msrp,
      sellingPrice: color?.sellingPrice,
      isFetching,
      discount: {
        priceDiscountAmount: transmission?.priceDiscountAmount,
        msrpWithDiscount: color?.msrpWithDiscount,
        sellingPriceWithDiscount: color?.sellingPriceWithDiscount,
      },
    },
  };
};

export const parseTrim = (
  modelKey,
  modelYear,
  trim,
  modelName,
  detailsPath,
  modelEmissionSegmentAverage,
  trimLegacyPageUrl,
) => {
  const defaultTransmissionFields = trim?.defaultTransmission?.item?.fields;
  const defaultTransmissionKey = defaultTransmissionFields?.detKey?.value;
  const defaultTransmission = trim?.transmissions?.[0]?.items?.find(
    transmission => transmission?.detKey?.value === defaultTransmissionKey,
  );
  return {
    ...trim,
    modelKey,
    modelYear,
    gtmModelName: modelName?.toLowerCase(),
    modelName,
    key: trim?.detKey?.value,
    name: trim?.trimName?.value,
    gtmTrimName: trim?.name?.toLowerCase(),
    gtmBodyStyle:
      trim?.bodyType?.item
        ?.map(item => item.name)
        ?.toString()
        ?.toLowerCase() || '',
    defaultTransmissionKey: trim?.defaultTransmission?.item?.fields?.detKey?.value,
    isDefaultTransmissionBuildable: parseBool(trim?.defaultTransmission?.item?.fields?.isBuildable?.value),
    defaultExteriorColorKey: defaultTransmission?.defaultExteriorColor?.item?.fields?.color?.fields?.detKey?.value,
    exteriorColors: defaultTransmission?.exteriorColors?.[0]?.colors.map(exteriorColor => ({
      key: exteriorColor?.color?.item?.fields?.detKey?.value,
      name: exteriorColor?.color?.item?.fields?.colorName?.value,
      hexValue: exteriorColor?.color?.item?.fields?.hexValue?.value,
      swatch: exteriorColor?.color?.item?.fields?.swatch?.value,
    })),
    nameBadge: trim?.nameBadge?.item?.value,
    primaryThumbnail: trim?.primaryThumbnail?.item?.value,
    secondaryThumbnail: trim?.secondaryThumbnail?.item?.value,
    transmissionModelCode: trim?.transmissions?.[0]?.items?.find(
      transmission => transmission?.detKey?.value === trim?.defaultTransmission?.item?.fields?.detKey?.value,
    )?.modelCode?.value,
    transmissions: trim?.transmissions?.[0]?.items?.map(transmission => ({
      key: transmission?.detKey?.value,
      isComparable: parseBool(transmission?.isComparable?.value),
      isBuildable: parseBool(transmission?.isBuildable?.value),
      isTestDrivable: parseBool(transmission?.isTestDrivable?.value),
      hidePriceAndFinance: parseBool(transmission?.hidePriceAndFinance?.value),
      modelCode: transmission?.modelCode?.value,
      name: transmission?.transmissionName?.value,
    })),
    filterValues: getTrimFilterValues({ ...trim, modelName, modelYear }),
    emissionRating: trim?.emissionRating?.value,
    emissionSegmentAverage: modelEmissionSegmentAverage,
    detailsPath: detailsPath && `${detailsPath}/?trim=${trim?.detKey?.value}`,
    trimLegacyPageUrl,
  };
};

export const parseModelYearModels = (catalogData, modelKey) =>
  catalogData?.value?.model?.fields?.modelYears?.map(modelYearModel => ({
    key: modelKey,
    year: modelYearModel?.year?.value,
    id: modelYearModel?.detIdentifier?.value,
    tagline: modelYearModel?.tagline?.value,
    defaultTrimKey: modelYearModel?.defaultTrim?.fields?.detKey?.value,
    trims: modelYearModel?.trims.map(trim =>
      parseTrim(
        trim?.modelKey || modelKey,
        modelYearModel?.year?.value,
        trim,
        catalogData?.value?.model?.fields?.modelName?.value,
        modelYearModel?.modelYearPage?.fields?.subPages?.find(sp => sp.name?.toLowerCase() === 'trims')?.url,
        modelYearModel?.emissionSegmentAverage?.value,
        modelYearModel?.trimLegacyPageUrl?.value,
      ),
    ),
  }));

export const parseActiveModel = catalogData => {
  const { model, heroImage, ctaLink, gtmInteractionType } = catalogData?.value || {};

  const modelFields = model?.fields;
  const modelKey = getModelKey(catalogData);
  const gtmModelName = modelFields?.name?.toLowerCase();
  const activeModelYear = getActiveModelYear(catalogData);
  const activeModelYears = getActiveModelYears(catalogData);
  const defaultModel = activeModelYear
    ? modelFields?.modelYears?.find(m => m?.year?.value === activeModelYear)
    : modelFields?.modelYears?.[0];
  const allModelYearModels = parseModelYearModels(catalogData, modelKey);
  const gtmBodyStyle =
    defaultModel?.defaultTrim?.fields?.bodyType?.item
      ?.map(item => item?.name)
      ?.toString()
      ?.toLowerCase() || '';
  let heroImageSource;

  if (Array.isArray(heroImage?.item?.value?.src)) {
    heroImageSource = heroImage?.item?.value?.src;
  } else {
    heroImageSource = `url("${
      isValidUrlOrRelativeUrl(heroImage?.item?.value?.src) ? heroImage?.item?.value?.src : ''
    }")`;
  }

  return {
    modelKey,
    activeModelYears,
    tagline: defaultModel?.tagline?.value,
    badgeImage: modelFields?.nameBadge?.item?.value,
    heroImage: heroImageSource,
    allModelYearModels,
    allModelYearTrims: allModelYearModels?.reduce((result, modelYearModel) => result.concat(modelYearModel?.trims), []),
    exploreCta: {
      ctaLink: ctaLink?.item,
      gtmTags: {
        gtmInteractionType,
        gtmModelName,
        gtmBodyStyle,
      },
    },
    vehicleType: modelFields?.vehicleType?.value,
  };
};

/**
 * getDetailsCtaGtmTagsByVariant function to handle gtmTags for details cta based on product line
 * @param {string} variant - variant name based on product line
 * @param {object} pspTrimCardGtmTags - passes the same gtmTags object as on the psp trimCard div
 * @param {string} detailsCtaLabel
 * @param {number} modelYear
 * @param {string} gtmModelName
 * @param {string} gtmTrimName
 * @param {object} autosCtaGtmTags - passes the gtm object used for autos trimcard ctas
 * @returns an object containing the relevant gtmTags
 */
export const getDetailsCtaGtmTagsByVariant = (
  variant,
  pspTrimCardGtmTags,
  detailsCtaLabel,
  modelYear,
  gtmModelName,
  gtmTrimName,
  autosCtaGtmTags,
) => {
  switch (variant) {
    // PSP
    case variant4:
      return Object.freeze({
        ...pspTrimCardGtmTags,
        'data-gtm-title': 'view-details',
      });
    default:
      return Object.freeze({
        'aria-label': `${detailsCtaLabel} ${modelYear} ${gtmModelName} ${gtmTrimName}`,
        ...autosCtaGtmTags,
      });
  }
};
