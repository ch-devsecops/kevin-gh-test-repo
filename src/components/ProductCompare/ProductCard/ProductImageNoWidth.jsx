import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from '@honda-canada/design-system-react';
import themeStyles from '../styles/ProductCard.styles';

const ImageContainer = themeStyles.apply(Box, 'ImageContainerPsp');

const ProductImageNoWidth = ({ thumbnail, productIndex, isSticky }) => {
  const { url, src, alt } = thumbnail || {};

  return (
    <ImageContainer my="m" isSticky={isSticky} data-testid={`compare-product-image${productIndex}`}>
      <Image src={url || src} alt={alt} />
    </ImageContainer>
  );
};

ProductImageNoWidth.propTypes = {
  thumbnail: PropTypes.shape({}),
  productIndex: PropTypes.number,
  isSticky: PropTypes.bool,
};

export default ProductImageNoWidth;
