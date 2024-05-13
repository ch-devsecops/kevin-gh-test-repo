import * as dictionary from '../../../sitecoreContextMocks/locales/en/translation.json';

const defaultSitecoreContext = {
  dictionary,
  route: {
    fields: {
      isDarkMode: {
        value: false,
      },
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

export const darkSitecoreContext = {
  ...defaultSitecoreContext,
  route: { fields: { isDarkMode: { value: true } } },
};

export default defaultSitecoreContext;
