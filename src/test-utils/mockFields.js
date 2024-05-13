/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */

// FIXME: jsdoc popup not working on test files
/** Class representing a mock data. */
class MockData {
  /**
   * Add a field.
   * @param {string} key - key of the field obj: i.e. 'title'
   * @param {Object} value - value of the field obj: i.e. { value: 'some text' }.
   */
  add(key, value) {
    this[key] = value;
  }
}

/**
 * Class representing mock fields object.
 * @extends MockData
 *
 * available method: add()
 *
 * default fields: [anchorId, title, bodyText, image, ctaLink, ctaType, ctaIcon, gtmCategory, gtmTitle, contentTitle, subtitle]
 *
 * note: we can add more commonly used fields in the class declaration if needed
 */
class MockFields extends MockData {
  constructor() {
    super();

    this.title = { value: 'Title' };
    this.bodyText = { value: 'BodyText' };
    this.image = {
      value: { src: 'mock.png', alt: 'mock alt' },
    };
    this.ctaLink = {
      value: {
        href: 'www.source.ca',
        title: 'cta aria label',
        text: 'CTA Text',
      },
    };
    this.ctaType = {
      value: 'Tertiary',
    };
    this.ctaIcon = {
      fields: {
        value: {
          value: 'arrowRight',
        },
      },
    };
    this.gtmCategory = {
      fields: {
        value: {
          value: 'Others',
        },
      },
    };
    this.gtmTitle = {
      value: 'gtm title',
    };
    this.contentTitle = {
      value: 'Content Title',
    };
    this.subtitle = {
      value: 'Content Subtitle',
    };
    this.seoH1 = {
      value: '',
    };
    this.anchorId = {
      value: 'anchor-id',
    };
    this.ctaLabel = {
      value: 'CTA Label',
    };
  }
}

/**
 * Class representing a mock rendering object
 * @extends MockData
 *
 * available method: add()
 */
class MockRendering extends MockData {
  /**
   * Create a mock rendering object
   * @param {string} componentName - adds componentName
   */
  constructor(componentName) {
    super();

    this.componentName = componentName;
  }
}

export { MockFields, MockRendering };
