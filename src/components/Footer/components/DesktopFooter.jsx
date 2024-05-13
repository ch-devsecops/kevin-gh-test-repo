import React, { useContext } from 'react';
import { Box, Optional, Wrapper } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';

import MenuLinks from './MenuLinks';
import BottomLinks from './BottomLinks';
import SocialMediaLinks from './SocialMediaLinks';
import GeoLocator from './GeoLocator';

import themeStyles from '../Footer.styles';
import BottomElementContext from '../BottomElementProvider/BottomElementContext';

const DesktopWrapper = themeStyles.apply(Box, 'DesktopWrapper');
const BottomContainer = themeStyles.apply(Box, 'BottomContainer');
const Container = themeStyles.apply(Wrapper, 'Container');
const Row = themeStyles.apply(Box, 'Row');
const Column = themeStyles.apply(Box, 'Column');
const SectionDivider = themeStyles.apply(Box, 'SectionDivider');

const DesktopFooter = ({ navigationItems, legalSection, socialMediaSection, showGeoLocator }) => {
  const { isHidden } = useContext(BottomElementContext);

  return (
    <DesktopWrapper isHidden={isHidden}>
      <Optional when={showGeoLocator}>
        <Container>
          <Row>
            <Column>
              <GeoLocator />
            </Column>
          </Row>
          <SectionDivider />
        </Container>
      </Optional>
      <Container>
        <Row>
          {navigationItems?.fields?.items?.map(items => (
            <Column key={items?.id}>
              <MenuLinks data={items} />
            </Column>
          ))}
          <Column>
            <SocialMediaLinks data={socialMediaSection} />
          </Column>
        </Row>
        <Row>
          <Column>
            <BottomContainer>
              <BottomLinks data={legalSection} />
            </BottomContainer>
          </Column>
        </Row>
      </Container>
    </DesktopWrapper>
  );
};

DesktopFooter.propTypes = {
  navigationItems: PropTypes.shape({
    fields: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  legalSection: PropTypes.shape({}),
  socialMediaSection: PropTypes.shape({}),
  showGeoLocator: PropTypes.bool,
};

export default DesktopFooter;
