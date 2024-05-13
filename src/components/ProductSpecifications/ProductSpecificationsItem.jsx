import React from 'react';
import PropTypes from 'prop-types';
import { Box, Copy } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import themeStyles from './ProductSpecifications.styles';
import { stripMarkdownHeading } from '../../utils/markdown';

const Row = themeStyles.apply(Box, 'Row');
const Column = themeStyles.apply(Copy, 'Column');

const ProductSpecificationsItem = ({ specs, gtmTags, styles }) => (
  <Box tabIndex={0} data-gtm-component-type={gtmTags?.type} {...styles?.containerStyles}>
    {specs?.map(spec => {
      const { label, value, displayOrder } = spec;
      return (
        <Row key={displayOrder} {...styles?.rowStyles}>
          <Column width={[1 / 2, 1 / 2, 1 / 6]} fontFamily="bold" {...styles?.firstColumnStyles}>
            {label}
          </Column>
          <Column width={[1 / 2, 1 / 2, 5 / 6]}>{compiler(stripMarkdownHeading(value))}</Column>
        </Row>
      );
    })}
  </Box>
);

ProductSpecificationsItem.defaultProps = {
  styles: {
    containerStyles: {},
    rowStyles: {},
    firstColumnStyles: {},
  },
};

ProductSpecificationsItem.propTypes = {
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      displayOrder: PropTypes.number,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
  }),
  styles: PropTypes.shape({
    containerStyles: PropTypes.shape({}),
    rowStyles: PropTypes.shape({}),
    firstColumnStyles: PropTypes.shape({}),
  }),
};

export default ProductSpecificationsItem;
