import React from 'react';
import styled from 'styled-components';
import { Box } from '@honda-canada/design-system-react';
import { Image } from '@sitecore-jss/sitecore-jss-react';

const Badge = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

const HeroBadge = ({ image, horizontalAlignment }) => {
  if (!image || !image.hasProp('src')) {
    return null;
  }
  const desktopMargin = {
    left: '0',
    right: '0 0 0 auto',
    center: '0 auto',
  };

  return (
    <Box width={['114px', '229px']} height={['28px', '56px']} margin={['0 auto', desktopMargin[horizontalAlignment]]}>
      <Badge field={image.field} />
    </Box>
  );
};

export default HeroBadge;
