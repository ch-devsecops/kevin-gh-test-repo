import { flatten } from 'lodash';

import { parseBool } from './common';

export const getModelYear = catalogData => catalogData?.data?.value?.modelYear?.fields;

export const getModelName = catalogData =>
  catalogData?.model?.modelName?.value || catalogData?.models?.[0]?.modelName?.value;

export const getModelKey = catalogData => catalogData?.model?.detKey?.value || catalogData?.models?.[0]?.detKey?.value;

// TODO: Cleanup with a proper mapper
export const getAllModelKeys = modelYear => {
  const models = flatten(
    modelYear.trims?.map(trim => ({
      modelKey: trim.detKey.value,
      modelYear: modelYear.year.value,
    })),
  );
  return models;
};

export const getModelProducts = catalogData => {
  if (catalogData?.trims) return catalogData?.trims;
  const trims = flatten(catalogData.models?.map(model => flatten(model.trims.map(trim => trim))));
  return trims;
};

export const getSubPagePath = (catalogData, subpageName) =>
  catalogData?.data?.value?.modelYear?.fields?.modelYearPage?.fields?.subPages?.find(
    subPage => subPage.name?.toLowerCase() === subpageName,
  )?.url;

export const getSimplifiedTrim = (modelYear, trim, detailsPath, mdlName, mdlKey) => {
  const defaultTransmissionFields = trim.defaultTransmission?.item?.fields || trim.defaultTransmission?.fields;
  const defaultTransmissionKey = defaultTransmissionFields?.detKey?.value;
  const defaultTransmission = trim.transmissions[0]?.items?.find(
    transmission => transmission?.detKey?.value === defaultTransmissionKey,
  );
  const defaultExteriorColor = defaultTransmission?.defaultExteriorColor?.item?.fields;
  const defaultExteriorColorKey = defaultExteriorColor?.color?.fields?.detKey?.value;
  const defaultInteriorColor = defaultExteriorColor?.defaultInteriorColor?.fields;
  const defaultInteriorColorKey = defaultInteriorColor?.color?.fields?.detKey?.value;
  // TODO: Cleanup with a proper mapper
  const modelKey = trim?.model?.detKey?.value || mdlKey;
  const modelName = trim?.model?.modelName?.value || mdlName;
  return {
    name: trim.trimName?.value,
    modelKey,
    modelYear,
    modelName,
    gtmModelName: modelName.toLowerCase(),
    gtmTrimName: trim.name?.toLowerCase(),
    gtmBodyStyle:
      trim.bodyType?.item
        ?.map(item => item.name)
        ?.toString()
        .toLowerCase() || '',
    bodyStyle: trim.bodyType,
    nameBadge: trim.specialVehicleType?.item ? trim.nameBadge?.item?.value : null,
    trimKey: trim?.detKey?.value,
    detIdentifier: trim.detIdentifier?.value,
    defaultExteriorColorKey,
    defaultInteriorColorKey,
    defaultTransmission,
    transmissions: trim.transmissions[0]?.items,
    transmissionKey: defaultTransmission?.detKey?.value,
    transmissionModelCode: defaultTransmission?.detKey?.value,
    isBuildable: parseBool(defaultTransmission?.isBuildable?.value),
    isComparable: parseBool(defaultTransmission?.isComparable?.value),
    isTestDrivable: parseBool(defaultTransmission?.isTestDrivable?.value),
    hidePriceAndFinance: parseBool(defaultTransmission?.hidePriceAndFinance?.value),
    image: trim.primaryThumbnail?.item?.value,
    secondaryImage: trim.secondaryThumbnail?.item?.value,
    isSpecialType: !!trim.specialVehicleType?.item?.fields?.specialVehicleTypeName?.value,
    specsPath: detailsPath,
  };
};

/**
 * Returns a simplified version of the trims for easier usage.
 *
 * @param {array} trims
 * @param {string} modelName
 * @param {string} modelKey
 * @param {string} modelYear
 * @param specsPath
 * @returns {array} Array of parsed trims
 */
export const getSimplifiedTrimsList = (trims, modelYear, specsPath) => {
  if (!trims) return null;
  // TODO: Cleanup with a proper mapper
  const modelName = getModelName(modelYear);
  const modelKey = getModelKey(modelYear);
  return trims.map(trim => getSimplifiedTrim(modelYear.year.value, trim, specsPath, modelName, modelKey));
};

export const getTrimPricing = (financials, trim, hasError, selectedExteriorColor, selectedTransmission) => {
  const financialsModel = financials?.models?.filter(m => m.modelKey === trim?.modelKey);
  const financialsTrim = financialsModel?.reduce((acc, item) => item?.trims?.find(t => t.key === trim?.trimKey), {});
  const transmissionModelCode = selectedTransmission?.detKey?.value || trim.defaultTransmission?.detKey?.value;
  const financialsTransmission = financialsTrim?.transmissions?.find(t => t.key === transmissionModelCode);
  const exteriorColors = financialsTransmission?.exteriorColors;
  const colorKey = selectedExteriorColor || trim.defaultExteriorColorKey;
  const color = exteriorColors?.find(c => c.key === colorKey);

  if (!color) return null;

  return {
    msrp: color?.msrp,
    sellingPrice: color?.sellingPrice,
    freightPdiCost: financialsTrim?.freightPdiCost,
    levyTotal: financialsTransmission?.levyTotal,
    hasError,
    discount: {
      priceDiscountAmount: financialsTransmission?.priceDiscountAmount,
      msrpWithDiscount: color?.msrpWithDiscount,
      sellingPriceWithDiscount: color?.sellingPriceWithDiscount,
    },
  };
};
