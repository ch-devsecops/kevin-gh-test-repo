import React from 'react';
import { Icon, Box } from '@honda-canada/design-system-react';
import themeStyles from './PriceComponent.styles';

const AnimatedLoader = themeStyles.apply(Icon, 'AnimatedLoader');
const Container = themeStyles.apply(Box, 'Container');

const Loader = ({ horizontalAlignment }) => (
  <Container horizontalAlignment={horizontalAlignment}>
    <AnimatedLoader data-testid="loading" name="animatedLoader" />
  </Container>
);

export default Loader;
