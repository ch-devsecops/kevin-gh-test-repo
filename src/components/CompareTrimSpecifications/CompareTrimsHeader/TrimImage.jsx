import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Image, Box } from '@honda-canada/design-system-react';

const MobileImageContainer = styled(Box)(({ isResized, areDelaysApplied }) =>
  css({
    display: 'flex',
    flex: '1',
    opacity: isResized ? 0 : 1,
    transition: 'opacity .3s',
    transitionDelay: areDelaysApplied ? '.3s' : 'unset',

    '& img': {
      paddingBottom: isResized ? '80px' : 0,
      px: isResized ? '40px' : 0,
      transition: 'padding .3s',
      transitionDelay: areDelaysApplied ? '.3s' : 'unset',
    },
  }),
);

const TrimImage = ({ trim, isResized, areDelaysApplied, isMobile }) => {
  const image = (
    <Image
      disableObjectFit
      coverContainer
      height="100%"
      width="auto"
      alt={trim?.primaryThumbnail?.alt}
      src={trim?.primaryThumbnail?.src}
    />
  );

  if (isMobile) {
    return (
      <MobileImageContainer isResized={isResized} areDelaysApplied={areDelaysApplied}>
        {image}
      </MobileImageContainer>
    );
  }

  return image;
};

export default TrimImage;
