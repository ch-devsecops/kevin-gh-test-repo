import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import AppRoot from './AppRoot';
import i18ninit from './utils/i18next/i18nInit';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

smoothscroll.polyfill();
const renderFunction = ReactDOM.render;
const config = {
  initialLang: 'en',
  defaultLang: 'en',
  sitecoreApiKey: import.meta.env.VITE_SITECORE_API_KEY,
  localhostSitecoreApiHost: import.meta.env.VITE_SITECORE_API_HOST,
  hondaExperienceApiConsumerId: import.meta.env.VITE_HONDA_EXPERIENCE_API_CONSUMER_ID,
  hondaExperienceApiConsumerName: import.meta.env.VITE_HONDA_EXPERIENCE_API_CONSUMER_NAME,
  hondaExperienceApiEnv: import.meta.env.VITE_HONDA_EXPERIENCE_API_ENV,
};

i18ninit().then(() => {
  const rootElement = document.getElementById('jss-root');
  renderFunction(<AppRoot path={window.location.pathname} config={config} />, rootElement);
});
