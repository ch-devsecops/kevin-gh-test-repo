import React, { useContext } from 'react';
import { Box, Image as ImageDSR, Optional } from '@honda-canada/design-system-react';
import Link from '../../RoutableSitecoreLink';

import ImageNotFound from './ImageNotFound';
import type { ImageProps } from '../types';
import Context from '../service/Context';

import themeStyles from '../styles/Card.styles';

const ImageNavLink = themeStyles.apply(Link, 'CardLink');
const ImageNav = themeStyles.apply(Box, 'CardLink');

const Image = (imageProps: ImageProps) => {
  const { image: imageContext, cta } = useContext(Context) || {};

  const { src, alt, placeholder, href, linktype, target, label } = { ...imageContext, ...cta, ...imageProps };
  const ImageWrapper = href ? ImageNavLink : ImageNav;

  return (
    <ImageWrapper
      data-testid="cy-uni-card-image"
      field={{
        value: {
          linktype,
          href,
          target,
        },
      }}
      aria-label={label}
    >
      <Optional when={src}>
        <Box>
          <ImageDSR src={src} alt={alt} />
        </Box>
      </Optional>
      <Optional when={!src}>
        <ImageNotFound altTextContent={placeholder} />
      </Optional>
    </ImageWrapper>
  );
};

export default Image;
