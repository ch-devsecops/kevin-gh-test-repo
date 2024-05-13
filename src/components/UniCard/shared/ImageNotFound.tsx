import React from 'react';
import { Box, Copy } from '@honda-canada/design-system-react';
import themeStyles from '../styles/Card.styles';

const ImageNotFoundWrapper = themeStyles.apply(Box, 'ImageNotFoundWrapper');
const ImageNotFoundCopy = themeStyles.apply(Copy, 'ImageNotFoundCopy');

type ImageNotFoundProps = {
  altTextContent?: string,
};

const ImageNotFound = ({ altTextContent = 'Image coming soon' }: ImageNotFoundProps) => (
  <ImageNotFoundWrapper>
    <ImageNotFoundCopy data-testid="cy-no-model-image">{altTextContent}</ImageNotFoundCopy>
  </ImageNotFoundWrapper>
);

export default ImageNotFound;
