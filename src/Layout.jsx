import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { responsiveVisibilityStyles } from '@honda-canada/design-system-react';
import { ACURA_SITE_NAME, ENGINE_SITE_NAME, MARINE_SITE_NAME, MC_SITE_NAME, PSP_SITE_NAME } from './utils/constants';
import { injectedReducer, injectedSlice, injectedApi } from './store';
import safelyStringifyJSON from './utils/safelyStringifyJSON';

const recursiveMapToInjectReducer = obj => {
  if (typeof obj?.params === 'object') {
    // eslint-disable-next-line no-param-reassign
    obj.params = { ...obj.params, injectedReducer, injectedSlice, injectedApi };
  }
  if (typeof obj?.placeholders === 'object') {
    // eslint-disable-next-line no-param-reassign
    obj.placeholders = Object.keys(obj.placeholders).reduce((acc, key) => {
      acc[key] = obj.placeholders[key].map(item => recursiveMapToInjectReducer(item));
      return acc;
    }, {});
  }
  return obj;
};

/*
  APP LAYOUT
  This is where the app's HTML structure and root placeholders should be defined.

  All routes share this root layout by default (this could be customized in RouteHandler),
  but components added to inner placeholders are route-specific.
*/
const Layout = ({ route }) => {
  let content;
  const routeProps = useMemo(() => recursiveMapToInjectReducer(route), [safelyStringifyJSON(route)]);
  switch (import.meta.env.VITE_JSS_SITE_NAME) {
    case ACURA_SITE_NAME:
      content = <Placeholder name="acura-main" rendering={route} />;
      break;
    case MC_SITE_NAME:
    case ENGINE_SITE_NAME:
    case MARINE_SITE_NAME:
    case PSP_SITE_NAME:
      content = (
        <>
          <Placeholder name="header" rendering={routeProps} />
          <Placeholder name="main" rendering={routeProps} />
          <Placeholder name="footer" rendering={routeProps} />
        </>
      );
      break;
    default:
      content = <Placeholder name="main" rendering={routeProps} />;
      break;
  }

  return (
    <div>
      <Helmet>
        <style type="text/css">{responsiveVisibilityStyles}</style>
      </Helmet>
      {route && content}
    </div>
  );
};

Layout.propTypes = {
  route: PropTypes.shape({
    defaultLang: PropTypes.string,
    initialLang: PropTypes.string,
    localhostSitecoreApiHost: PropTypes.string,
    sitecoreApiKey: PropTypes.string,
  }),
};

export default Layout;
