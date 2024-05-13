import { Box, Copy } from '@honda-canada/design-system-react';
import * as PropTypes from 'prop-types';
import React from 'react';
import themeStyles from './DistributerCard.styles';

const StyledCopy = themeStyles.apply(Copy, 'StyledCopy');

const Address = ({ addressLine1, addressLine2, cityProvincePostalAddress, ...rest }) => (
  <Box {...rest}>
    <StyledCopy>{addressLine1}</StyledCopy>
    <StyledCopy>{addressLine2}</StyledCopy>
    <StyledCopy>{cityProvincePostalAddress}</StyledCopy>
  </Box>
);

Address.propTypes = {
  addressLine1: PropTypes.string,
  addressLine2: PropTypes.string,
  cityProvincePostalAddress: PropTypes.string,
};

export default Address;
