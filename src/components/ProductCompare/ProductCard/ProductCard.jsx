import React from 'react';
import PropTypes from 'prop-types';
import { Box, Icon, IconWrapper, Optional } from '@honda-canada/design-system-react';
import themeStyles from '../styles/ProductCard.styles';

const ProductCardContainer = themeStyles.apply(Box, 'ProductCardContainer');
const CloseButton = themeStyles.apply(Box, 'CloseButton');

const ProductCard = ({
  onRemoveOption,
  productIndex,
  isSticky,
  showCloseBtn,
  productCardPosition,
  productCardAlignment,
  productCardPseudoElement,
  children,
  removeGtmTags,
}) => (
  <ProductCardContainer
    data-testid="product-compare-container"
    productCardPosition={productCardPosition}
    productCardAlignment={productCardAlignment}
    productCardPseudoElement={productCardPseudoElement}
    isSticky={isSticky}
  >
    <Optional when={showCloseBtn}>
      <CloseButton data-testid={`close-button${productIndex}`} {...removeGtmTags}>
        <IconWrapper
          data-testid={`remove-product${productIndex}-from-compare`}
          onClick={() => onRemoveOption(productIndex)}
        >
          <Icon name="close" color="black" />
        </IconWrapper>
      </CloseButton>
    </Optional>
    {children}
  </ProductCardContainer>
);

ProductCard.defaultProps = {
  onRemoveOption: () => {},
  productIndex: 0,
  showCloseBtn: true,
};

ProductCard.propTypes = {
  isSticky: PropTypes.bool,
  showCloseBtn: PropTypes.bool,
  onRemoveOption: PropTypes.func,
  productIndex: PropTypes.number,
  productCardPosition: PropTypes.string,
  productCardAlignment: PropTypes.string,
  productCardPseudoElement: PropTypes.objectOf(PropTypes.string),
  removeGtmTags: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProductCard;
