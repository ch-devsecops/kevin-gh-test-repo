import React from 'react';
import PropTypes from 'prop-types';
import { Box, H5 } from '@honda-canada/design-system-react';
import { getTitleComponent } from '../../../utils/markdown';
import themeStyles from '../styles/ProductCard.styles';

const Title = themeStyles.apply(Box, 'Title');

const ProductTitle = ({ title, productIndex, defaultHeader, hasPadding }) => {
  const TitleComponent = getTitleComponent(title, defaultHeader);
  return (
    <Title hasPadding={hasPadding}>
      <TitleComponent data-testid={`compare-product-title${productIndex}`}>{title}</TitleComponent>
    </Title>
  );
};

ProductTitle.defaultProps = {
  title: '',
  defaultHeader: H5,
};

ProductTitle.propTypes = {
  title: PropTypes.string,
  productIndex: PropTypes.number,
  defaultHeader: PropTypes.node,
  hasPadding: PropTypes.string,
};

export default ProductTitle;
