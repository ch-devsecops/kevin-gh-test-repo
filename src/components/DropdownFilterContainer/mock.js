export const fields = {
  contentTitle: { value: 'SELECT A VEHICLE' },
  ctaLink: {
    value: {
      href: 'http://www.acura.ca',
      linktype: 'external',
      url: 'http://www.acura.ca',
      text: 'View Vehicle',
      anchor: '',
      target: '_blank',
    },
  },
  ctaType: { value: '' },
  gtmTitle: { value: 'gtm title' },
  items: [
    {
      fields: {
        contentTitle: { value: 'Model' },
        errorText: { value: 'Error with item 1 occured' },
        placeholderText: { value: 'Select a model...' },
      },
    },
    {
      fields: {
        contentTitle: { value: 'Trim' },
        errorText: { value: 'Error with item 2 occured' },
        placeholderText: { value: 'Select a trim...' },
      },
    },
  ],
};

export const rendering = {
  componentName: 'DropdownFilterContainer',
  fields,
  placeholders: {
    'dropdown-filter-content': [
      {
        componentName: 'SectionContainer',
        fields: { contentTitle: { value: 'Option 1' } },
        placeholders: {
          'section-content': [
            {
              componentName: 'LandscapeCard',
              fields: { title: { value: 'Option 1.1' } },
            },
            {
              componentName: 'LandscapeCard',
              fields: { title: { value: 'Option 1.2' } },
            },
          ],
        },
      },
      {
        componentName: 'SectionContainer',
        fields: { contentTitle: { value: 'Option 2' } },
        placeholders: {
          'section-content': [
            {
              componentName: 'LandscapeCard',
              fields: { title: { value: 'Option 2.1' } },
            },
            {
              componentName: 'LandscapeCard',
              fields: { title: { value: 'Option 2.2' } },
            },
          ],
        },
      },
    ],
  },
};
