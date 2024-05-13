import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Media } from '@honda-canada/design-system-react';
import DesktopHeader from './desktop';
import MobileHeader from './mobile';

const BodyStyles = createGlobalStyle`
  body {
    padding-top: ${({ theme }) => theme.header.mobile.height};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    body {
      padding-top: ${({ theme, top }) => top || theme.header.desktop.height};
    }
  }
`;
// TODO: Implement all links as RoutableSitecoreLinks, once
// they point to Sitecore pages. See https://jira.web.honda.ca:8443/browse/SCC-1088.

const MCHeader = ({ fields, sitecoreContext }) => {
  const { dictionary, route, language } = sitecoreContext;
  const { pageEditing, pageState } = sitecoreContext;
  const addSpaceAbove = pageEditing || pageState === 'preview';

  const { languageSelectors } = sitecoreContext;
  const siteLogo = route?.placeholders?.header?.find(component => component.componentName === 'SiteLogo');

  const langToggle = languageSelectors.find(lang => lang.code !== language);

  const mainNav = fields?.items?.find(item => item.name?.toLowerCase() === 'topnavigation');

  if (!mainNav) return null;

  const shareData = fields?.items?.find(item => item.name?.toLowerCase() === 'share');
  const socials = fields?.items?.find(item => item.name?.toLowerCase() === 'socialmediasection');
  const infoLinks = fields?.items?.find(item => item.name?.toLowerCase() === 'infolinks');
  const utilityLinks = fields?.items?.find(item => item.name?.toLowerCase() === 'utilitysection');

  return (
    <>
      <BodyStyles top={addSpaceAbove ? '89px' : 0} />
      <Media greaterThan="smallDesktop">
        <DesktopHeader
          shareData={shareData}
          socials={socials}
          mainNav={mainNav}
          infoLinks={infoLinks}
          utilityLinks={utilityLinks}
          siteLogo={siteLogo?.fields.siteLogo}
          siteLogoLink={siteLogo?.fields.headerUrl}
          langToggle={langToggle}
          addSpaceAbove={addSpaceAbove}
        />
      </Media>
      <Media lessThan="desktop">
        <MobileHeader
          mainNav={mainNav}
          shareData={shareData}
          utilityLinks={utilityLinks}
          siteLogo={siteLogo?.fields.siteLogo}
          siteLogoLink={siteLogo?.fields.headerUrl}
          langToggle={langToggle}
          langText={dictionary?.Shared?.Header?.language}
        />
      </Media>
    </>
  );
};

export default withSitecoreContext()(MCHeader);
