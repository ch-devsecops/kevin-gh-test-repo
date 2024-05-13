import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Box } from '@honda-canada/design-system-react';
import { SimpleStyle } from '../propTypes';

import themeStyles from './Loader.styles';

const AnimatedLoader = themeStyles.apply(Icon, 'AnimatedLoader');
const Container = themeStyles.apply(Box, 'Container');

const Loader = ({ horizontalAlignment, loaderStyles, containerStyles, testId = 'loading-state' }) => (
  <Container horizontalAlignment={horizontalAlignment} {...containerStyles}>
    <AnimatedLoader data-testid={testId} name="animatedLoader" {...loaderStyles?.styles} />
  </Container>
);

Loader.propTypes = {
  horizontalAlignment: PropTypes.string,
  loaderStyles: PropTypes.shape({
    styles: SimpleStyle,
  }),
  containerStyles: SimpleStyle,
};

export default Loader;
