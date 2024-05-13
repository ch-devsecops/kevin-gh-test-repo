import { cleanup } from 'test-utils';
import { getCategorizedSpecifications, getHydratedTrims } from '../service/utils';
import { isDownloadCtaValid } from '../TrimCardsSlider/utils';
import { jssFields } from '../__mocks__/mockData';

afterEach(cleanup);

// TODO: UI tests

const { trims } = jssFields.data.value.modelYear.fields;
const year = jssFields.data.value.modelYear.fields.year.value;
const modelKey =
  jssFields.data.value.modelYear.fields.model.detKey.value ||
  jssFields.data.value.modelYear.fields?.modelYear?.fields?.models?.[0]?.detKey?.value;

const financials = {
  models: [
    {
      trims: [
        {
          id: 10252,
          transmissions: [
            {
              msrp: 1000,
            },
          ],
        },
        {
          id: 10253,
          transmissions: [
            {
              msrp: 2000,
            },
          ],
        },
      ],
    },
  ],
};

const strings = {
  msrpStartingFromLabel: 'MSRP Starting From',
  sellingPriceLabel: 'Selling Price',
};

const specifications = trims.map(trim => ({
  trimId: parseInt(trim.detIdentifier.value, 10),
  label: 'ENGINE',
  name: 'engine',
  specs: [
    {
      label: 'My label',
      value: `Value for ${trim.detIdentifier.value}`,
    },
  ],
}));

describe('getHydratedTrims', () => {
  test('should return trims with prices from the financials API', () => {
    const hydratedTrims = getHydratedTrims(trims, year, modelKey, financials, strings, null, true, true);
    expect(hydratedTrims[0]).toHaveProperty('priceMsrp', 1000);
    expect(hydratedTrims[1]).toHaveProperty('priceMsrp', 2000);
  });

  test('should return trims with jss field data', () => {
    const hydratedTrims = getHydratedTrims(trims, year, modelKey, financials, strings);

    expect(hydratedTrims[0]).toHaveProperty('isBuildable', true);
    expect(hydratedTrims[0]).toHaveProperty('isSpecialType', true);
    expect(hydratedTrims[0]).toHaveProperty('name', 'TLX');
    expect(hydratedTrims[0]).toHaveProperty('trimKey', 'tlx_10252');
    expect(hydratedTrims[0]).toHaveProperty('modelKey', 'tlx');
    expect(hydratedTrims[1]).toHaveProperty('isBuildable', false);
    expect(hydratedTrims[1]).toHaveProperty('isSpecialType', false);
    expect(hydratedTrims[1]).toHaveProperty('name', 'TECH');
    expect(hydratedTrims[1]).toHaveProperty('trimKey', 'tech_10253');
    expect(hydratedTrims[1]).toHaveProperty('modelKey', 'tlx');
  });
});

describe('getCategorizedSpecifications', () => {
  test('should provide specs in the order trims are provided', () => {
    const categorizedSpecifications = getCategorizedSpecifications(specifications, trims);

    expect(categorizedSpecifications[0].specifications[0].specs[0]).toHaveProperty('value', 'Value for 10252');
    expect(categorizedSpecifications[0].specifications[1].specs[0]).toHaveProperty('value', 'Value for 10253');
  });

  test('should add labels to each category based on the specifications API response', () => {
    const categorizedSpecifications = getCategorizedSpecifications(specifications, trims);

    expect(categorizedSpecifications[0].specificationLabels[0]).toHaveProperty('label', 'My label');
  });
});

describe('isDownloadCtaValid', () => {
  it('should return true if both text and href are truthy', () => {
    const cta = {
      item: {
        value: {
          text: 'Download',
          href: 'https://www.acura.com',
        },
      },
    };
    expect(isDownloadCtaValid(cta)).toBe(true);
  });
  it('should return false if href is not truthy', () => {
    const cta = {
      item: {
        value: {
          text: 'Download',
          href: '',
        },
      },
    };
    expect(isDownloadCtaValid(cta)).toBe(false);
  });
  it('should return false if text is not truthy', () => {
    const cta = {
      item: {
        value: {
          text: '',
          href: 'https://www.acura.com',
        },
      },
    };
    expect(isDownloadCtaValid(cta)).toBe(false);
  });
});
