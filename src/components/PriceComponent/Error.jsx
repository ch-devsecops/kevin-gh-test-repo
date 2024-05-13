import React from 'react';
import { Box, Icon, IconWrapper } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';
import themeStyles, { ErrorCopy } from './PriceComponent.styles';

const Container = themeStyles.apply(Box, 'Container');
const ErrorIcon = themeStyles.apply(Icon, 'ErrorIcon');

const Error = ({ message, horizontalAlignment, verticalAlignment, errorStyles }) => (
  <Container
    horizontalAlignment={horizontalAlignment}
    verticalAlignment={verticalAlignment}
    data-testid="pricing-error"
    {...errorStyles?.container}
  >
    <IconWrapper size="iconWrapper.zero">
      <ErrorIcon name="information" />
    </IconWrapper>
    <ErrorCopy data-testid="price-error-message" size={errorStyles?.copy?.size} styles={errorStyles?.copy?.styles}>
      {message}
    </ErrorCopy>
  </Container>
);

Error.propTypes = {
  message: PropTypes.string,
  horizontalAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  verticalAlignment: PropTypes.oneOf(['center', 'start', 'end']),
  errorStyles: PropTypes.shape({
    container: PropTypes.shape({}),
    copy: PropTypes.shape({}),
  }),
};

export default Error;
