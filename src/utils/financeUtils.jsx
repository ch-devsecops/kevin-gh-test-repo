import React from 'react';
import { useTranslation } from 'react-i18next';

import getProductLineLetter from './api/getProductLineLetter';
import { ACURA_SITE_NAME, HONDA_SITE_NAME, PSP_SITE_NAME, apiModes, provinceTypes } from './constants';

export const PaymentTermLabel = ({ frequency, method, hasAsterisk }) => {
  const { t } = useTranslation();
  if (!frequency || !method) return null;

  const strings = {
    paymentFrequencyMonthly: t('Shared.Common.PaymentFrequency.monthly'),
    paymentFrequencyBiWeekly: t('Shared.Common.PaymentFrequency.biWeekly'),
    paymentFrequencyWeekly: t('Shared.Common.PaymentFrequency.weekly'),
    paymentMethodLease: t('Shared.Common.PaymentMethod.lease'),
    paymentMethodFinance: t('Shared.Common.PaymentMethod.finance'),
  };

  const label = {
    weekly: {
      lease: `${strings.paymentFrequencyWeekly} ${strings.paymentMethodLease}`,
      finance: `${strings.paymentFrequencyWeekly} ${strings.paymentMethodFinance}`,
    },
    biweekly: {
      lease: `${strings.paymentFrequencyBiWeekly} ${strings.paymentMethodLease}`,
      finance: `${strings.paymentFrequencyBiWeekly} ${strings.paymentMethodFinance}`,
    },
    monthly: {
      lease: `${strings.paymentFrequencyMonthly} ${strings.paymentMethodLease}`,
      finance: `${strings.paymentFrequencyMonthly} ${strings.paymentMethodFinance}`,
    },
  };

  return (
    <>
      {label?.[frequency]?.[method]}
      {hasAsterisk && '*'}
    </>
  );
};

export const PaymentMethodLabel = (method, toLowerCase = false) => {
  const { t } = useTranslation();
  if (!method) return null;

  const strings = {
    paymentMethodLease: t('Shared.Common.PaymentMethod.lease'),
    paymentMethodFinance: t('Shared.Common.PaymentMethod.finance'),
  };

  const label = {
    lease: `${strings.paymentMethodLease}`,
    finance: `${strings.paymentMethodFinance}`,
  };

  return toLowerCase ? label[method].toLowerCase() : label[method];
};

export const PaymentFrequencyLabel = (frequency, toLowerCase = false) => {
  const { t } = useTranslation();
  if (!frequency) return null;

  const strings = {
    paymentFrequencyMonthly: t('Shared.Common.PaymentFrequency.monthly'),
    paymentFrequencyBiWeekly: t('Shared.Common.PaymentFrequency.biWeekly'),
    paymentFrequencyWeekly: t('Shared.Common.PaymentFrequency.weekly'),
  };

  const label = {
    weekly: `${strings.paymentFrequencyWeekly}`,
    biweekly: `${strings.paymentFrequencyBiWeekly}`,
    monthly: `${strings.paymentFrequencyMonthly}`,
  };

  return toLowerCase ? label[frequency].toLowerCase() : label[frequency];
};

export const PriceTooltipLabel = (provinceCode, provinces) => {
  const provinceType =
    (provinceCode && provinces.find(p => p.name === provinceCode)?.pricingType) ?? provinceTypes.msrp;

  const { t } = useTranslation();
  const strings = {
    msrpTooltip: t('Shared.Common.msrpStartingFromTooltipLabel'),
    sellingPriceWithFeesTooltip: t('Shared.Common.sellingPriceWithFeesTooltipLabel'),
    sellingPriceWithoutFeesTooltip: t('Shared.Common.sellingPriceWithoutFeesTooltipLabel'),
  };

  switch (provinceType) {
    case provinceTypes.msrp: {
      return strings.msrpTooltip;
    }
    case provinceTypes.sellingPriceWithFees: {
      return strings.sellingPriceWithFeesTooltip;
    }
    case provinceTypes.sellingPriceWithoutFees: {
      return strings.sellingPriceWithoutFeesTooltip;
    }
    default: {
      return strings.msrpTooltip;
    }
  }
};

export const getIsSellingPriceProvince = (provinceCode, provinces) => {
  const isSellingPriceProvince = provinceCode && provinces?.find(p => p.name === provinceCode)?.showSellingPrice;
  return isSellingPriceProvince;
};

export const getPriceTooltipLabelKey = (provinceCode, provinces) =>
  getIsSellingPriceProvince(provinceCode, provinces)
    ? 'Shared.Common.sellingPriceTooltipLabel'
    : 'Shared.Common.msrpStartingFromTooltipLabel';

/**
 * Returns the composite flags to show selling, msrp or both prices
 * @param paymentOptions
 * @param provinceCode
 * @param provinces
 * @returns {{showSellingPrice: boolean, showMsrpPrice: boolean}}
 */
export const getShowPriceFlags = (provinceCode, provinces, paymentOptions) => {
  const isPaymentOptionsSelected = paymentOptions?.paymentMethod && paymentOptions?.paymentFrequency;
  const province = provinceCode && provinces?.find(p => p.name === provinceCode);

  // payment-freq and payment-method are part of the component fields,
  // and at least one has no value and both sitecore flags are true
  if (paymentOptions && !isPaymentOptionsSelected && province?.showMsrpPrice && province?.showSellingPrice) {
    return { showMsrpPrice: true, showSellingPrice: true };
  }

  return { showMsrpPrice: !province?.showSellingPrice, showSellingPrice: province?.showSellingPrice };
};

/**
 * Returns price object to be used by the price component
 * @param priceLabels prepared by other Components in format like return object
 * @returns {{allInPrice: object, msrpPrice: object }}
 */
export const usePricesFromFinancialModel = (priceLabels = {}, type = 'trims') => {
  const { t } = useTranslation();

  const getPrices = finances => {
    let valueAllIn;
    let valueMsrp;
    let priceDiscountAmount;
    let msrpWithDiscount;
    let sellingPriceWithDiscount;
    const extColor = finances?.exteriorColors?.[0] || finances?.transmissions?.[0]?.exteriorColors?.[0];
    switch (type) {
      case 'models':
        valueAllIn = finances?.trims?.[0]?.transmissions?.[0]?.exteriorColors?.[0]?.sellingPrice || null;
        valueMsrp = finances?.trims?.[0]?.transmissions?.[0]?.exteriorColors?.[0]?.msrp || null;
        priceDiscountAmount = finances?.trims?.[0]?.transmissions?.[0]?.priceDiscountAmount;
        msrpWithDiscount = finances?.trims?.[0]?.transmissions?.[0]?.exteriorColors?.[0]?.msrpWithDiscount;
        sellingPriceWithDiscount =
          finances?.trims?.[0]?.transmissions?.[0]?.exteriorColors?.[0]?.sellingPriceWithDiscount;
        break;

      case 'trims':
      default:
        valueAllIn =
          finances?.exteriorColors?.[0]?.sellingPrice ||
          finances?.transmissions?.[0]?.exteriorColors?.[0]?.sellingPrice ||
          null;
        valueMsrp =
          finances?.exteriorColors?.[0]?.msrp || finances?.transmissions?.[0]?.exteriorColors?.[0]?.msrp || null;

        priceDiscountAmount = finances?.transmissions?.[0]?.priceDiscountAmount;
        msrpWithDiscount = extColor?.msrpWithDiscount;
        sellingPriceWithDiscount = extColor?.sellingPriceWithDiscount;
        break;
    }

    return {
      allInPrice: {
        value: valueAllIn,
        label: t('Shared.Common.allInPriceLabel'),
        ...priceLabels?.allInPrice,
      },
      msrpPrice: {
        value: valueMsrp,
        label: t('Shared.Common.msrpStartingFromLabel'),
        ...priceLabels?.msrpPrice,
      },
      discount: {
        priceDiscountAmount,
        msrpWithDiscount,
        sellingPriceWithDiscount,
      },
    };
  };

  return {
    getPrices,
  };
};

/**
 * Returns price object to be used by the price component per configuration
 * @param priceLabels prepared by other Components in format like return object
 * @param modelPrices
 * @param configurationId
 * @param detKey
 * @returns {{allInPrice: object, msrpPrice: object }}
 */
export const usePricesConfiguration = (priceLabels = {}) => {
  const { t } = useTranslation();

  const getPrices = (modelPrices, configurationId, detKey) => ({
    allInPrice: {
      value: modelPrices?.[configurationId]?.sellingPrice || modelPrices?.[detKey]?.sellingPrice || null,
      label: t('Shared.Common.allInPriceLabel'),
      ...priceLabels?.allInPrice,
    },
    msrpPrice: {
      value: modelPrices?.[configurationId]?.msrp || modelPrices?.[detKey]?.msrp || null,
      label: t('Shared.Common.msrpStartingFromLabel'),
      ...priceLabels?.msrpPrice,
    },
    discount: {
      priceDiscountAmount:
        modelPrices?.[configurationId]?.priceDiscountAmount || modelPrices?.[detKey]?.priceDiscountAmount,
      sellingPriceWithDiscount:
        modelPrices?.[configurationId]?.sellingPriceWithDiscount || modelPrices?.[detKey]?.sellingPriceWithDiscount,
      msrpWithDiscount: modelPrices?.[configurationId]?.msrpWithDiscount || modelPrices?.[detKey]?.msrpWithDiscount,
    },
  });

  return getPrices;
};

/**
 * Returns price object to be used by the price component per configuration
 * @param {*} payload - the payload from the api
 * @param {*} state - the current state
 * @returns {{modelConfiguration: object, modelConfigurationArray: array }}
 */
export const makeModelConfiguration = (payload, state = {}) => {
  const modelConfiguration = {
    ...state?.modelConfiguration,
    ...payload?.models?.reduce((acc, model) => {
      model?.trims?.forEach(trim => {
        trim?.transmissions?.forEach(transmission => {
          acc[transmission?.id] = {
            priceDiscountAmount: transmission?.priceDiscountAmount,
            ...transmission?.exteriorColors?.[0],
          };
        });
      });
      return acc;
    }, {}),
  };
  const modelConfigurationArray = Object.keys(modelConfiguration).map(key => ({ ...modelConfiguration[key], id: key }));

  return {
    ...state,
    modelConfiguration,
    modelConfigurationArray,
  };
};

/**
 * gets the apiPath for Financial provider based on the appName and VehicleType.
 *
 * @param {string} appName - The siteName.
 * @param {string} pageState - The pageState from sitecorecontext.
 * @param {string} vehicleType - The vehicleType from sitecore.
 *  @returns {string} - Constructed apiPath for the request.
 */
export const getFinancialApiPath = (appName, pageState, vehicleType) => {
  const productLineLetter = getProductLineLetter.get(appName);
  const financialPathSegment = 'financials-worksheets';
  const websiteAndPricePathSegment = 'website/price-calculator';
  let apiPath;

  switch (appName) {
    case PSP_SITE_NAME:
      apiPath = `${financialPathSegment}/${productLineLetter[vehicleType]}/${apiModes[pageState]}/${websiteAndPricePathSegment}`;
      break;
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
    default:
      apiPath = `${financialPathSegment}/${productLineLetter}/${apiModes[pageState]}/${websiteAndPricePathSegment}`;
      break;
  }
  return apiPath;
};
