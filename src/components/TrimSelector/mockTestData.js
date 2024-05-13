import { MockFields } from 'test-utils';

const toggleContentData = {
  toggleLabels: {
    year: {
      label: 'Year',
      placeholder: 'Select a Year',
      error: 'Please select a Year',
    },
    model: {
      label: 'Model',
      placeholder: 'Select a Model',
      error: 'Please select a Model',
    },
    trim: {
      label: 'Trim',
      placeholder: 'Select a Trim',
      error: 'Please select a Trim',
    },
  },
  ctaDetails: [
    {
      type: 1,
      url: 'url1',
    },
    {
      type: 2,
      url: 'url2',
    },
  ],
  years: [
    {
      year: '2018',
      models: [
        {
          modelName: 'Civic',
          ctaType: 1,
          trims: ['Civic DX', 'Civic LX'],
        },
        {
          modelName: 'Fit',
          ctaType: 2,
          trims: ['FIT NAVI', 'FIT EX'],
        },
      ],
    },
    {
      year: '2019',
      models: [
        {
          modelName: 'Accord',
          ctaType: 1,
          trims: ['Accord LX', 'Accord DX'],
        },
        {
          modelName: 'Civic',
          ctaType: 2,
          trims: ['CIVIC CVT', 'CIVIC EX'],
        },
      ],
    },
  ],
};

const withoutTrimsData = {
  toggleLabels: {
    year: {
      label: 'Year',
      placeholder: 'Select a Year',
      error: 'Please select a Year',
    },
    model: {
      label: 'Model',
      placeholder: 'Select a Model',
      error: 'Please select a Model',
    },
  },
  ctaDetails: [
    {
      type: 1,
      url: 'url1',
    },
    {
      type: 2,
      url: 'url2',
    },
  ],
  years: [
    {
      year: '2018',
      models: [
        {
          modelName: 'Civic',
          ctaType: 1,
        },
        {
          modelName: 'Fit',
          ctaType: 2,
        },
      ],
    },
    {
      year: '2019',
      models: [
        {
          modelName: 'Accord',
          ctaType: 1,
        },
        {
          modelName: 'Civic',
          ctaType: 2,
        },
      ],
    },
  ],
};

const contentJson = JSON.stringify(toggleContentData);
const contentJsonNoTrim = JSON.stringify(withoutTrimsData);

const mockFields = new MockFields();
mockFields.add('toggleContent', { value: contentJson });

const mockFieldsNoTrim = new MockFields();
mockFieldsNoTrim.add('toggleContent', { value: contentJsonNoTrim });

export { toggleContentData, withoutTrimsData, mockFields, mockFieldsNoTrim, contentJson, contentJsonNoTrim };
