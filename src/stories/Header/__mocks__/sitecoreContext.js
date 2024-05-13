import dictionary from '../../../sitecoreContextMocks/locales/en/translation.json';

export default {
  dictionary,
  route: {
    placeholders: {
      header: [
        {
          uid: 'aa61ffb8-7220-4df4-aa8c-0a6f9abff222',
          componentName: 'SiteLogo',
          dataSource: '{A9BA3BCE-93E8-4DA5-9DD2-552987B8691D}',
          params: {},
          fields: {
            siteLogo: {
              value: {
                src: './sample-mock-data/media/img/placeholders/logo-placeholder.png',
                alt: 'logo',
                width: '115',
                height: '37',
              },
            },
            headerUrl: {
              value: {
                href: 'http://instagram.com/hondamotoca',
                linktype: 'external',
                url: 'http://instagram.com/hondamotoca',
              },
            },
          },
        },
      ],
    },
  },
  language: 'en',
  languageSelectors: [
    {
      code: 'en',
      url: '/en/',
    },
    {
      code: 'fr',
      url: '/fr/',
    },
  ],
};
