import React from 'react';
import { Copy } from '@honda-canada/design-system-react';
import * as PropTypes from 'prop-types';
import themeStyles from './DistributerCard.styles';

const StyledCopy = themeStyles.apply(Copy, 'StyledCopy');

const ContactNumber = props => {
  const { item, ...rest } = props;
  return <StyledCopy {...rest}>{`${item?.name}: ${item?.info}`}</StyledCopy>;
};

ContactNumber.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    info: PropTypes.string,
  }),
};

export default ContactNumber;
