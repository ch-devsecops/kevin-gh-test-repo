export const variant1 = 'variant1';
export const variant2 = 'variant2';
export const variant3 = 'variant3';
export const variant4 = 'variant4';

export const PAYMENT_METHOD = 'finance';
export const PAYMENT_FREQUENCY = 'weekly';

/**
 * This empty data structure serves as a baseline for the modelCardWithTrims component.
 * Note that all the properties are generically named and matches between Marine and Auto brands.
 * However we are left with Trims and Transmissions that sound auto specific
 * and they map to Models and Configurations respectively.
 */

export const emptyDataFields = {
  data: {
    value: {
      heroImage: {},
      useDefaultModelYear: { value: '' },
      paymentMethod: { value: '' },
      paymentFrequency: { value: '' },
      showInformationalApr: { value: '' },
      model: {},
    },
  },
};

export const emptyDataModel = {
  fields: {
    defaultYear: { fields: {} },
    nameBadge: { item: { value: {} } },
    sotId: { value: '' },
  },
};

export const emptyModelYears = {
  defaultTrim: { fields: {} },
  detKey: { value: '' },
  emissionSegmentAverage: { value: '' },
  legacyPageUrl: { value: '' },
  sotId: { value: '' },
  tagline: { value: '' },
  trimLegacyPageUrl: { value: '' },
  year: { value: '' },
};

export const emptyDataTrim = {
  defaultTransmission: { item: {} },
  detKey: { value: '' },
  emissionRating: { value: '' },
  nameBadge: { item: { value: {} } },
  primaryThumbnail: { item: { value: {} } },
  secondaryThumbnail: { item: { value: {} } },
  sotId: { value: '' },
  specialVehicleType: { item: null },
  trimName: { value: '' },
};
