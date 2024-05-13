import { initReactI18next } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import i18n from 'i18next';

// Mode details on adding i18next support to storybook https://storybook.js.org/addons/storybook-react-i18next
const ns = ['translation'];
const supportedLngs = ['en', 'fr'];
const resources = ns.reduce((acc, n) => {
  supportedLngs.forEach(async lng => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      [n]: await import(`../../sitecoreContextMocks/locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {});

i18n.use(initReactI18next).init({
  debug: false,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'translation',
  ns,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  supportedLngs,
  resources,
});

export default i18n;
