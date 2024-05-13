import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BackToTop, Box, Media, Optional, useThemeContext } from '@honda-canada/design-system-react';
import DesktopFooter from './components/DesktopFooter';
import { getSection } from './utils';
import MobileFooter from './components/MobileFooter';
import getValueByKey from '../../utils/getValueByKey';
import themeStyles from './Footer.styles';
import BottomElementContext from './BottomElementProvider/BottomElementContext';
import { getGtmTagValue } from '../../utils/gtmEvents';

const BackToTopButton = themeStyles.apply(BackToTop, 'BackToTopButton');
const BackToTopWrapper = themeStyles.apply(Box, 'BackToTopWrapper');

const Footer = ({ fields, rendering }) => {
  const { setRef, isHidden } = useContext(BottomElementContext);
  const { colors } = useThemeContext();

  if (!fields) {
    return null;
  }

  const navigationItems = getSection(fields, 'NavigationSection');
  const backToTopData = getSection(fields, 'BackToTopSection');
  const socialMediaSection = getSection(fields, 'SocialMediaSection');
  const legalSection = getSection(fields, 'LegalSection');
  const showGeoLocator = !!getSection(fields, 'GeoLocatorSection');

  return (
    <>
      <Media lessThan="desktop">
        <MobileFooter
          showGeoLocator={showGeoLocator}
          navigationItems={navigationItems}
          legalSection={legalSection}
          socialMediaSection={socialMediaSection}
          data-gtm-component-type={getGtmTagValue(rendering?.componentName)}
        />
      </Media>
      <Media greaterThanOrEqual="desktop">
        <DesktopFooter
          showGeoLocator={showGeoLocator}
          navigationItems={navigationItems}
          legalSection={legalSection}
          socialMediaSection={socialMediaSection}
          data-gtm-component-type={getGtmTagValue(rendering?.componentName)}
        />
      </Media>
      <Optional when={backToTopData}>
        <BackToTopWrapper ref={setRef} isHidden={isHidden}>
          <BackToTopButton backToTopLabel={getValueByKey(backToTopData, 'value')} arrowColor={colors?.red} />
        </BackToTopWrapper>
      </Optional>
    </>
  );
};

Footer.propTypes = {
  fields: PropTypes.shape({}),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

export default Footer;
