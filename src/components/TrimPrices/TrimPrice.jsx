import React from 'react';
import PropTypes from 'prop-types';
import { Copy, Row } from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';

const TrimPrice = ({ price, label }) => (
  <Row alignItems="center">
    <Copy size="legal" mr="1" fontWeight="regular">
      {label}
    </Copy>
    <Copy size="extraSmall" fontWeight="bold">
      {price > 0 && formatPrice(price)}
    </Copy>
  </Row>
);

TrimPrice.propTypes = {
  price: PropTypes.number,
  label: PropTypes.string,
};

export default TrimPrice;
