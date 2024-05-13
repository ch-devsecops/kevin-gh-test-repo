import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Box, H6, Optional } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';

import { stripMarkdownHeading } from '../../../utils/markdown';

import BottomLinks from './BottomLinks';
import SocialMediaLinks from './SocialMediaLinks';
import MenuLinks from './MenuLinks';
import GeoLocator from './GeoLocator';

import themeStyles from '../Footer.styles';
import BottomElementContext from '../BottomElementProvider/BottomElementContext';

const MobileContainer = themeStyles.apply(Box, 'MobileContainer');
const MobileBottomContainer = themeStyles.apply(Box, 'MobileBottomContainer');
const StyledH6 = themeStyles.apply(H6, 'StyledH6');
const SectionDivider = themeStyles.apply(Box, 'SectionDivider');

const MobileFooter = ({ navigationItems, legalSection, socialMediaSection, showGeoLocator }) => {
  const { isHidden } = useContext(BottomElementContext);
  const navItems = navigationItems?.fields?.items;

  const accordionItems = navItems?.map((items, index) => ({
    key: index,
    title: <StyledH6>{compiler(stripMarkdownHeading(items?.fields?.categoryTitle?.value))}</StyledH6>,
    content: <MenuLinks data={items} showHeader={false} />,
  }));

  return (
    <MobileContainer isHidden={isHidden}>
      <Optional when={showGeoLocator}>
        <Box>
          <GeoLocator />
        </Box>
        <SectionDivider />
      </Optional>
      <Box>
        <SocialMediaLinks data={socialMediaSection} />
        <Accordion items={accordionItems} isCompact />
        <MobileBottomContainer>
          <BottomLinks title="legalSection" data={legalSection} />
        </MobileBottomContainer>
      </Box>
    </MobileContainer>
  );
};

MobileFooter.propTypes = {
  navigationItems: PropTypes.shape({
    fields: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  legalSection: PropTypes.shape({}),
  socialMediaSection: PropTypes.shape({}),
  showGeoLocator: PropTypes.bool,
};

export default MobileFooter;
