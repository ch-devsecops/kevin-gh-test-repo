import React from 'react';
import styled from 'styled-components';
import { Box } from '@honda-canada/design-system-react';
import SubNav from './SubNav';
import MainNav from './MainNav';

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.colors.trueBlack,
  position: 'fixed',
  left: 0,
  color: theme.colors.white,
  zIndex: theme.zIndices.header,
}));

const DesktopHeader = ({
  shareData,
  socials,
  mainNav,
  infoLinks,
  utilityLinks,
  siteLogo,
  siteLogoLink,
  langToggle,
  addSpaceAbove,
}) => {
  const top = addSpaceAbove ? '89px' : 0;

  return (
    <Container top={top}>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        maxWidth="1440px"
        mx="auto"
        width="100%"
      >
        <MainNav
          mainNav={mainNav}
          infoLinks={infoLinks}
          siteLogo={siteLogo}
          siteLogoLink={siteLogoLink}
          langToggle={langToggle}
        />
        <SubNav socials={socials} shareData={shareData} utilityLinks={utilityLinks} />
      </Box>
    </Container>
  );
};

export default DesktopHeader;
