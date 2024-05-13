export const getPricingByProvinceType = (trimFinancials, transmissionDetKey, exteriorColorDetKey, strings) => {
  if (!trimFinancials) return null;

  const transmissionFinancials = trimFinancials?.transmissions?.filter(t1 => t1.key === transmissionDetKey);

  const colorFinancials = transmissionFinancials[0]?.exteriorColors?.filter(c => c.key === exteriorColorDetKey);

  return {
    priceMsrp: colorFinancials?.[0]?.msrp,
    priceSelling: colorFinancials?.[0]?.sellingPrice,
    labelMsrp: strings?.msrpStartingFromLabel,
    labelSelling: strings?.sellingPriceLabel,
  };
};

const getLegalDisclaimers = specifications => {
  const legalDisclaimerSpecifications =
    specifications && specifications.find(({ name }) => name === 'legal_disclaimers_');

  return legalDisclaimerSpecifications
    ? {
        category: legalDisclaimerSpecifications.label,
        items: legalDisclaimerSpecifications.specs?.map(({ label }) => label?.replace(/\*/g, '<sup>ⓘ</sup>')),
      }
    : null;
};

// This method transforms/merges/aggregates the SitecoreContext trims with the Financials Trims.
export const getHydratedTrims = (
  trimData,
  modelYear,
  strings,
  isSellingPriceProvince,
  specifications = [],
  financials = [],
) =>
  trimData.map(trim => {
    const defaultTransmissionFields = trim.defaultTransmission?.item?.fields;
    const defaultTransmissionKey = defaultTransmissionFields?.detKey?.value;
    const defaultTransmission = trim.transmissions?.[0]?.items?.find(
      transmission => transmission?.detKey?.value === defaultTransmissionKey,
    );
    const trimId = parseInt(trim.detIdentifier?.value, 10);
    const exteriorColorDetKey = defaultTransmission?.defaultExteriorColor?.item?.fields?.color?.fields?.detKey?.value;
    const trimSpecifications = specifications?.filter(specs => specs.trimId === trimId);
    const trimFinancials =
      financials && financials?.models ? financials?.models?.[0]?.trims?.filter(t => t.id === trimId) : null;
    const pricingObject =
      trimFinancials &&
      getPricingByProvinceType(trimFinancials?.[0], defaultTransmissionKey, exteriorColorDetKey, strings);

    return {
      id: parseInt(trim.detIdentifier?.value, 10),
      keyFeatures: trim.compareTrimKeyFeatures?.item?.value,
      specs:
        trimSpecifications &&
        trimSpecifications
          .filter(({ name }) => name !== 'legal_disclaimers_')
          .map(({ specs, label }) => ({
            category: label,
            items: specs.map(({ label: legalDisclaimerLabel, value }) => ({
              label: legalDisclaimerLabel?.replace(/\*/g, '<sup>ⓘ</sup>'),
              value,
            })),
          })),
      legalDisclaimers: getLegalDisclaimers(trimSpecifications),
      primaryThumbnail: trim.primaryThumbnail?.item?.value,
      isBuildable: trim.defaultTransmission?.item?.fields?.isBuildable?.value,
      name: trim.trimName?.value,
      modelYear: modelYear?.fields?.year?.value,
      modelKey: modelYear?.fields?.model?.detKey?.value,
      trimKey: trim.detKey?.value,
      transmissionKey: defaultTransmissionKey,
      exteriorColorKey: exteriorColorDetKey,
      interiorColorKey:
        trim.defaultTransmission?.defaultExteriorColor?.item?.fields?.defaultInteriorColor?.fields?.color?.fields
          ?.detKey?.value,
      price: pricingObject?.price,
      pricingLabel: pricingObject?.label,
      gtmName: trim.name,
      bodyStyle:
        trim?.bodyType?.item
          ?.map(item => item.name)
          .toString()
          .toLowerCase() || '',
    };
  });
