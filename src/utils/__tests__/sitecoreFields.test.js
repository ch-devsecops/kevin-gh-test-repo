import {
  mapFieldToDesignSystemImage,
  mapJssFieldsToCtaComponents,
  getVideoProps,
  mapGTMCategory,
} from '../sitecoreFields';

describe('mapJssFieldsToCtaComponents utility function', () => {
  it('should return empty array when fields parameter is an empty object', () => {
    const invalidCTA = mapJssFieldsToCtaComponents({});
    expect(invalidCTA).toHaveLength(0);
  });

  it('should return empty array when fields parameter is falsy', () => {
    const invalidCTA = mapJssFieldsToCtaComponents(undefined);
    expect(invalidCTA).toHaveLength(0);
  });

  it('should return an array of CTA when fields parameter is valid', () => {
    const validCTA = mapJssFieldsToCtaComponents({
      ctaLink1: { value: { href: 'https://example.com' } },
      ctaType1: { value: 'Primary' },
    });
    expect(validCTA).toHaveLength(1);
  });

  it('should render an array of two ctas when fields values are valid for both ctas', () => {
    const validCTA = mapJssFieldsToCtaComponents({
      ctaLink1: { value: { href: 'https://example.com' } },
      ctaType1: { value: 'Primary' },
      ctaLink2: { value: { href: 'https://example.com' } },
      ctaType2: { value: 'Primary' },
    });
    expect(validCTA).toHaveLength(2);
  });
});

describe('mapFieldToDesignSystemImage utility function', () => {
  it('should return undefined when an empty src is provided', () => {
    const imageField = {
      value: {
        src: '',
      },
    };

    const imageComponent = mapFieldToDesignSystemImage(imageField);
    expect(imageComponent).toEqual(undefined);
  });

  it('should return an image component when the field parameter provided is valid', () => {
    const imageField = {
      value: {
        src: 'www.acura.ca',
      },
    };

    const imageComponent = mapFieldToDesignSystemImage(imageField);
    expect(imageComponent).toHaveProperty('props');
  });
});

describe('getVideoProps utility function', () => {
  it('getVideoProps function should return undefined if invalid src is provided', () => {
    const videoField = getVideoProps('', 'aria', 'close aria');
    expect(videoField).toEqual(undefined);
  });

  it('getVideoProps function should return a valid object if valid src is provided', () => {
    const validVideoObj = {
      src: 'www.acura.ca',
      ariaLabel: 'aria',
      closeAriaLabel: 'close aria',
    };
    const videoField = getVideoProps(validVideoObj.src, validVideoObj.ariaLabel, validVideoObj.closeAriaLabel);

    expect(videoField.src).toEqual(validVideoObj.src);
    expect(videoField.ariaLabel).toEqual(validVideoObj.ariaLabel);
    expect(videoField.closeAriaLabel).toEqual(validVideoObj.closeAriaLabel);
  });
});

describe('mapGTMCategory utility function', () => {
  it('should return `Others` when provided value is falsy', () => {
    const emptyFieldsValue = { fields: { value: { value: '' } } };
    const emptyValue = { value: '' };

    expect(mapGTMCategory(null)).toBe('Others');
    expect(mapGTMCategory(emptyValue)).toBe('Others');
    expect(mapGTMCategory(emptyFieldsValue)).toBe('Others');
  });

  it('should return value', () => {
    const fieldsValue = { fields: { value: { value: 'promotions' } } };
    const value = { value: 'promotions' };

    expect(mapGTMCategory(fieldsValue)).toBe('promotions');
    expect(mapGTMCategory(value)).toBe('promotions');
  });
});
