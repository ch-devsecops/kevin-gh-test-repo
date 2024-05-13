import React from 'react';
import { Copy, Icon, Link } from '@honda-canada/design-system-react';
import { Link as RouterLink } from 'react-router-dom';
import themeStyles from './TrimOverview.styles';
import type { BackButtonProps } from './types';

const BackLabel = themeStyles.apply(Copy, 'BackLabel');
const BackLink = themeStyles.apply(Link, 'BackLink');

const BackButton = ({ backStepUrlField }: BackButtonProps) => {
  if (!backStepUrlField || !backStepUrlField.text || !backStepUrlField.href) {
    return null;
  }

  const { text, href } = backStepUrlField;

  return (
    <BackLink as={RouterLink} to={href} data-testid="cy-back-cta" disableHover>
      <Icon name="arrowLeft" />
      <BackLabel size="small">{text}</BackLabel>
    </BackLink>
  );
};

export default BackButton;
