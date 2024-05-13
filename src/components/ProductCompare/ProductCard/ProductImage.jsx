import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from '@honda-canada/design-system-react';
import themeStyles from '../styles/ProductCard.styles';

const ProductImageContainer = themeStyles.apply(Box, 'ProductImage');

const ProductImage = ({ thumbnail, productIndex, isSticky }) => {
  const { url, src, width, height, alt } = thumbnail || {};
  return (
    <ProductImageContainer my="m" isSticky={isSticky} data-testid={`compare-product-image${productIndex}`}>
      <Image src={url || src} alt={alt} width={width && `${width}px`} height={height && `${height}px`} />
    </ProductImageContainer>
  );
};

ProductImage.propTypes = {
  thumbnail: PropTypes.shape({}),
  productIndex: PropTypes.number,
  isSticky: PropTypes.bool,
};

export default ProductImage;
