import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import NotImplemented from '../NotImplemented';
import MCHeader from '../MCHeader';
import Header from './Header';
import { ENGINE_SITE_NAME, MARINE_SITE_NAME, MC_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import { variant1, variant2, variant3 } from './service/constants';

const HeaderMap = props => {
  const appName = props?.sitecoreContext?.site?.name?.toLowerCase();

  switch (appName) {
    case ENGINE_SITE_NAME.toLowerCase():
      return <Header variant={variant1} {...props} />;
    case MARINE_SITE_NAME.toLowerCase():
      return <Header variant={variant2} {...props} />;
    case PSP_SITE_NAME.toLowerCase():
      return <Header variant={variant3} {...props} />;
    case MC_SITE_NAME.toLowerCase():
      return <MCHeader {...props} />;
    default:
      return <NotImplemented name="Header" />;
  }
};

export default withSitecoreContext()(HeaderMap);
