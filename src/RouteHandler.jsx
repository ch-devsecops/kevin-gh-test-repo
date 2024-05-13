/* eslint-disable */
import React from 'react';
import i18n from 'i18next';
import { isEditorActive, RestLayoutService, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import Layout from './Layout';
import * as dictionary from './sitecoreContextMocks/locales/en/translation.json';
import provinces from './sitecoreContextMocks/provinces';
import sharedApps from './sitecoreContextMocks/sharedApps';
import settings from './sitecoreContextMocks/settings';

/**
 * Gets route data from Sitecore. This data is used to construct the component
 * layout for a JSS route.
 * @param sitecoreRoutePath
 * @param {string} language Language to get route data in (content language, e.g. 'en')
 * @param {object} config
 */
const getRouteData = (sitecoreRoutePath, language, config) => {
  const layoutServiceInstance = new RestLayoutService({
    apiKey: config.sitecoreApiKey,
    siteName: import.meta.env.VITE_JSS_SITE_NAME,
    apiHost: config.localhostSitecoreApiHost,
  });

  return layoutServiceInstance.fetchLayoutData(sitecoreRoutePath, language).catch(error => {
    if (error.response && error.response.status === 404 && error.response.data) {
      return error.response.data;
    }

    console.error('Route data fetch error', error, error.response);

    return null;
  });
};

class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notFound: false,
      defaultLanguage: 'en',
    };

    const routeData = this.extractRouteData();

    if (props.route !== null) {
      this.state.notFound = false;
    }

    if (routeData?.sitecore?.context?.language) {
      this.state.defaultLanguage = routeData.sitecore.context.language;
    }

    this.updateLanguage();
  }

  componentDidMount() {
    this.updateRouteData();
  }

  componentDidUpdate(previousProps) {
    const existingRoute = previousProps.route.match.url;
    // eslint-disable-next-line
    const newRoute = this.props.route.match.url;

    // don't change state (refetch route data) if the route has not changed
    if (existingRoute === newRoute) {
      return;
    }

    // if in experience editor - force reload instead of route data update
    // avoids confusing Sitecore's editing JS
    if (isEditorActive()) {
      window.location.assign(newRoute);
      return;
    }

    this.updateLanguage();
    this.updateRouteData();
  }

  extractRouteData = () => {
    if (!this.props.sitecoreContext) return null;

    const { route, ...context } = this.props.sitecoreContext;

    return {
      sitecore: {
        route,
        context,
      },
    };
  };

  /**
   * Loads route data from Sitecore Layout Service into state.routeData
   */
  updateRouteData() {
    let sitecoreRoutePath = this.props.route.match.params.sitecoreRoute || '/';
    if (!sitecoreRoutePath.startsWith('/')) {
      sitecoreRoutePath = `/${sitecoreRoutePath}`;
    }

    const language = this.props.route.match.params.lang || this.state.defaultLanguage;
    // get the route data for the new route
    getRouteData(sitecoreRoutePath, language, this.props.config).then(routeData => {
      if (routeData !== null && routeData.sitecore && routeData.sitecore.route) {
        // set the sitecore context data and push the new route
        this.props.updateSitecoreContext({
          dictionary,
          sharedApps,
          provinces,
          settings,
          hondaRestApiHost: import.meta.env.VITE_HONDA_API_HOST,
          route: routeData.sitecore.route,
          itemId: routeData.sitecore.route.itemId,
          layoutServiceRoute: '/sitecore/api/layout/render/jss',
          sitecoreApiKey: import.meta.env.VITE_SITECORE_API_KEY,
          localhostSitecoreApiHost: import.meta.env.VITE_SITECORE_API_HOST,
          sotHondaExperienceApiConfig: {
            consumerName: import.meta.env.VITE_SOT_EXPERIENCE_API_CONSUMER_NAME,
            consumerId: import.meta.env.VITE_SOT_EXPERIENCE_API_CONSUMER_ID,
            env: import.meta.env.VITE_SOT_EXPERIENCE_API_ENV,
          },
          ...routeData.sitecore.context,
        });
        this.setState({ notFound: false });
      } else {
        this.setState({ notFound: true }, () => {
          const context = routeData && routeData.sitecore ? routeData.sitecore.context : null;

          this.props.updateSitecoreContext(context);
        });
      }
    });
  }

  /**
   * Updates the current app language to match the route data.
   */
  updateLanguage() {
    const newLanguage = this.props.route.match.params.lang || this.state.defaultLanguage;

    if (i18n.language !== newLanguage) {
      i18n.changeLanguage(newLanguage);
    }
  }

  render() {
    const { notFound } = this.state;
    const routeData = this.extractRouteData();

    if (notFound && routeData) {
      return 'Not found.';
    }

    if (!routeData) {
      return null;
    }

    return <Layout route={routeData.sitecore.route} />;
  }
}

export default withSitecoreContext({ updatable: true })(RouteHandler);
