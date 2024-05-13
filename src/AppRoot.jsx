import React, { StrictMode, useState } from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CurrentBreakpointProvider,
  GlobalCSS,
  MediaContextProvider,
  OptionalVideoModal,
  OptionalVideoModalContextProvider,
} from '@honda-canada/design-system-react';
import Helmet from 'react-helmet';
import { AcuraTheme } from '@honda-canada/design-system-react/lib/acura-theme';
import { HondaTheme } from '@honda-canada/design-system-react/lib/honda-theme';
import { MotorsTheme } from '@honda-canada/design-system-react/lib/motors-theme';
import { MCTheme } from '@honda-canada/design-system-react/lib/mc-theme';
import { PSPTheme } from '@honda-canada/design-system-react/lib/psp-theme';
import { GoogleApiKeyProvider, GoogleApiKeyContext } from '@honda-canada/experience-api-client';
import UserLocationProvider from '@honda-canada/user-location';
import MockLegacyHeader from './MockLegacyHeader';

import ModelExplorationContextProvider from './components/ModelExplorationContext';
import ModelFiltersContextProvider from './components/ModelFiltersContext';
import componentFactory from './componentFactory';
import RouteHandler from './RouteHandler';
import { ACURA_THEME_NAME } from './utils/constants';
import LocalStorageProvider from './components/LocalStorageContext';
import BottomElementProvider from './components/Footer/BottomElementProvider';
import { store } from './store';

export const routePatterns = [
  '/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*',
  '/:lang([a-z]{2})/:sitecoreRoute*',
  '/:sitecoreRoute*',
];

const themeBySiteName = {
  acura: AcuraTheme,
  honda: HondaTheme,
  engine: MotorsTheme,
  marine: MotorsTheme,
  mc: MCTheme,
  atvsxs: HondaTheme,
  pe: HondaTheme,
  psp: PSPTheme,
};

const AppRoot = ({ config }) => {
  const [reloadLocationFromCookies, setReloadLocationFromCookies] = useState(false);
  const googleMapsConfig = {
    consumerId: config?.hondaExperienceApiConsumerId,
    consumerName: config?.hondaExperienceApiConsumerName,
    env: config?.hondaExperienceApiEnv,
  };
  return (
    <StrictMode>
      <Helmet>
        <link
          rel="stylesheet"
          href={`/node_modules/@honda-canada/design-system-react/lib/${
            import.meta.env.VITE_SITECORE_THEME_NAME
          }-css.css`}
        />
      </Helmet>
      <SitecoreContext componentFactory={componentFactory}>
        <Provider store={store}>
          <ThemeProvider theme={themeBySiteName[import.meta.env.VITE_JSS_SITE_NAME?.toLowerCase()]}>
            <MockLegacyHeader />
            <OptionalVideoModalContextProvider>
              <CurrentBreakpointProvider>
                <GlobalCSS />
                <MediaContextProvider>
                  <BrowserRouter location={window.location.pathname}>
                    <ModelExplorationContextProvider>
                      <GoogleApiKeyProvider {...googleMapsConfig}>
                        <GoogleApiKeyContext.Consumer>
                          {({ apiKey }) => (
                            <UserLocationProvider
                              googleMapsApiKey={apiKey}
                              forceReload={reloadLocationFromCookies}
                              onLocationChanged={() => {
                                setReloadLocationFromCookies(!reloadLocationFromCookies);
                              }}
                            >
                              <ModelFiltersContextProvider>
                                <LocalStorageProvider>
                                  <BottomElementProvider>
                                    <Switch>
                                      {routePatterns.map(routePattern => (
                                        <Route
                                          key={routePattern}
                                          path={routePattern}
                                          render={props => (
                                            <RouteHandler
                                              route={props}
                                              config={config}
                                              placeholderName={
                                                import.meta.env.VITE_JSS_SITE_NAME === ACURA_THEME_NAME
                                                  ? 'acura-main'
                                                  : 'main'
                                              }
                                            />
                                          )}
                                        />
                                      ))}
                                    </Switch>
                                  </BottomElementProvider>
                                </LocalStorageProvider>
                              </ModelFiltersContextProvider>
                            </UserLocationProvider>
                          )}
                        </GoogleApiKeyContext.Consumer>
                      </GoogleApiKeyProvider>
                    </ModelExplorationContextProvider>
                  </BrowserRouter>
                </MediaContextProvider>
              </CurrentBreakpointProvider>
              <OptionalVideoModal />
            </OptionalVideoModalContextProvider>
          </ThemeProvider>
        </Provider>
      </SitecoreContext>
    </StrictMode>
  );
};

AppRoot.propTypes = {
  config: PropTypes.shape({
    defaultLang: PropTypes.string,
    initialLang: PropTypes.string,
    localhostSitecoreApiHost: PropTypes.string,
    sitecoreApiKey: PropTypes.string,
  }),
};

export default AppRoot;
