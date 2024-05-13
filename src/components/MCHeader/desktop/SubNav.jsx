import React from 'react';
import styled from 'styled-components';
import { Box, Image } from '@honda-canada/design-system-react';
import ShareLinks from './ShareLinks';
import UtilityNav from './UtilityLinks';

const Container = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-30px',
  right: '0',
  height: theme.header.desktop.subNavHeight,
  background: 'linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.5) 100%)',
  borderRadius: '0 0 0 5px',
  display: 'flex',
  alignItems: 'center',
}));

const DesktopSubNav = ({ shareData, socials, utilityLinks }) => {
  if (!socials?.fields || !shareData?.fields) return null;

  const { title, items: icons } = shareData.fields;
  const { items: socialItems } = socials.fields;

  return (
    <Container>
      <UtilityNav utilityLinks={utilityLinks} />
      <Box as="ul" mr="s" display="flex" justifyContent="space-between" py="7px 4px" ml="s">
        {socialItems?.map((link, i) => (
          <Box key={i.toString()} as="li" width="20px" height="20px" mx="2px">
            <a rel="noreferrer" {...link?.fields?.url?.value}>
              <Image {...link?.fields?.logo?.value} />
            </a>
          </Box>
        ))}
      </Box>
      <ShareLinks label={title?.value} icons={icons} />
    </Container>
  );
};

export default DesktopSubNav;
