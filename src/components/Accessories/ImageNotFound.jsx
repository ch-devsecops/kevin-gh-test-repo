import React from 'react';
import PropTypes from 'prop-types';
import { Box, Copy } from '@honda-canada/design-system-react';
import themeStyles from './ImageNotFound.styles';

const ImageNotFound = ({ altTextContent, accessoryModal }) => {
  const ImageNotFoundWrapper = themeStyles.apply(Box, 'ImageNotFoundWrapper');
  const ImageNotFoundCopy = themeStyles.apply(Copy, 'ImageNotFoundCopy');

  return (
    <ImageNotFoundWrapper accessoryModal={accessoryModal}>
      <ImageNotFoundCopy data-testid="cy-no-image">{altTextContent}</ImageNotFoundCopy>
    </ImageNotFoundWrapper>
  );
};

ImageNotFound.propTypes = {
  altTextContent: PropTypes.string,
};

export default ImageNotFound;
