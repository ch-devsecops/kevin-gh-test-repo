import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { useThemeContext } from '@honda-canada/design-system-react';
import { useAppName } from '../../../utils/sitecoreContext';
import { getComponentFromRoute } from '../../../utils/sitecorePlaceholders';
import { ATV_PRODUCT_NAME, HONDA_SITE_NAME, SXS_PRODUCT_NAME } from '../../../utils/constants';
import ProgressSideNavLayout from './ProgressSideNavLayout';

const ProgressSideNav = ({ rendering, sitecoreContext }) => {
  const header = useThemeContext('header');

  const appName = useAppName();
  const hasModelPageNav = getComponentFromRoute('ModelPageNav', sitecoreContext.route);

  if (!rendering) return null;

  let HondaCssOverride;
  let leftColumnMobileTopPosition = header.mobile.globalHeaderHeight || header.mobile.height;
  let leftColumnPadding;

  switch (appName) {
    case HONDA_SITE_NAME:
      HondaCssOverride = true;
      leftColumnMobileTopPosition = hasModelPageNav ? '70px' : header.mobile.height;
      break;
    case ATV_PRODUCT_NAME:
    case SXS_PRODUCT_NAME:
      leftColumnPadding = 'l';
      break;
    default:
      break;
  }

  const leftColumnTopPosition = [
    leftColumnMobileTopPosition,
    leftColumnMobileTopPosition,
    header.desktop.stickyHeight || header.desktop.height,
  ];

  return (
    <ProgressSideNavLayout
      cssOverrideHonda={HondaCssOverride}
      leftColumnTopPosition={leftColumnTopPosition}
      leftColumnPadding={leftColumnPadding}
      rendering={rendering}
    />
  );
};

export default withSitecoreContext()(ProgressSideNav);
