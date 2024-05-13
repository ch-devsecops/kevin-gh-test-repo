import React from 'react';
import { Box } from '@honda-canada/design-system-react';

import themeStyles from './Details.styles';

const ToggleWrapper = themeStyles.apply(Box, 'ToggleWrapper');
const ToggleIndicator = themeStyles.apply(Box, 'ToggleIndicator');

const Toggle = ({ on, onClick, isDark, toggleAriaLabel }) => (
  <ToggleWrapper onClick={onClick} aria-label={toggleAriaLabel}>
    <ToggleIndicator isDark={isDark} on={on.toString()} />
  </ToggleWrapper>
);

export default Toggle;
