import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Copy } from '@honda-canada/design-system-react';

const NotImplemented = ({ name }) => {
  const {
    sitecoreContext: { site: { name: siteName } = {} },
  } = useSitecoreContext();

  const text = siteName ? `Please update ${name} component if you expect one for ${siteName} app.` : '';
  return <Copy>{`No ${name} Implementation for ${siteName}. ${text}`}</Copy>;
};

export default NotImplemented;
