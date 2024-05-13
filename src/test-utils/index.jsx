import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { BrowserRouter } from 'react-router-dom';
import { OptionalVideoModalContextProvider } from '@honda-canada/design-system-react';
import UserLocationProvider from '@honda-canada/user-location';
import { configureAxe } from 'jest-axe';
import ModelExplorationContextProvider from '../components/ModelExplorationContext';
import ModelFiltersContextProvider from '../components/ModelFiltersContext';
import { MockFields, MockRendering } from './mockFields';
import MockTheme from './mockTheme';
import 'intersection-observer';
import { ACURA_THEME_NAME } from '../utils/constants';

const generateJssWrapper = context =>
  // eslint-disable-next-line react/display-name
  function ({ children }) {
    return (
      <SitecoreContext
        context={{
          language: 'en',
          site: { name: ACURA_THEME_NAME },
          ...context?.sitecoreContext,
        }}
        componentFactory={{}}
      >
        <BrowserRouter>
          <UserLocationProvider>
            <ThemeProvider theme={context?.theme || MockTheme}>
              <OptionalVideoModalContextProvider>
                <ModelExplorationContextProvider>
                  <ModelFiltersContextProvider>{children}</ModelFiltersContextProvider>
                </ModelExplorationContextProvider>
              </OptionalVideoModalContextProvider>
            </ThemeProvider>
          </UserLocationProvider>
        </BrowserRouter>
      </SitecoreContext>
    );
  };
/**
 * A custom implementation of the testing-library `render` function that
 * wraps tests in an typical JSS app's context providers.
 * Note that you can include a `context` object to set or override values
 * for SitecoreContext and ThemeContext.
 * @param {ReactElement} component - the component you want testing-library to render
 * @param {object} [options] - see https://testing-library.com/docs/react-testing-library/api/#render-options
 * @param {string} [options.context] - default values for SitecoreContext, ThemeProvider
 * @param {string} [options.context.sitecoreContext] - value for SitecoreContext
 * @param {string} [options.context.theme] - value for ThemeProvider
 * @example
 * const { getByText } = jssRender(
 *  <MyComponent />, { context: { sitecoreContext: { language: 'fr' } } }
 * );
 * @returns {function(): void} custom testing-library render function
 */
const jssRender = (component, options = {}) => {
  const { context } = options;
  // eslint-disable-next-line no-param-reassign
  delete options.context;

  return render(component, {
    wrapper: generateJssWrapper(context),
    ...options,
  });
};

const generateWrapper = context =>
  // eslint-disable-next-line react/display-name
  function ({ children }) {
    return (
      <BrowserRouter>
        <ThemeProvider theme={context?.theme || MockTheme}>
          <OptionalVideoModalContextProvider>{children}</OptionalVideoModalContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  };

/**
 * A custom implementation of the testing-library `render` function that
 * wraps tests in typical design-system context providers.
 * Note that you can include a `theme` object to set or override values
 * for ThemeContext.
 * @param {ReactElement} component - the component you want testing-library to render
 * @param {object} [options] - see https://testing-library.com/docs/react-testing-library/api/#render-options
 * @param {string} [options.theme] - default value for ThemeProvider
 * @example
 * const { getByText } = render(
 *  <MyComponent />, { theme: { space: { wrapperGap: '15px' } } }
 * );
 * @returns {function(): void} custom testing-library render function
 */
const customRender = (component, options = {}) => {
  const { theme } = options;
  // eslint-disable-next-line no-param-reassign
  delete options.theme;

  return render(component, {
    wrapper: generateWrapper(theme),
    ...options,
  });
};

// disable accessibility checks for errors that are usually trigged by content mistakes
const axe = configureAxe({
  rules: {
    'duplicate-id': { enabled: false },
    'heading-order': { enabled: false },
  },
});

export * from 'jest-axe';
export { axe };
export * from '@testing-library/react';
export { customRender as render, jssRender };
export { MockFields, MockRendering, MockTheme };
