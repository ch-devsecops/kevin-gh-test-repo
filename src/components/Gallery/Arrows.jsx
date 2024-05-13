import React from 'react';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box, Icon, IconWrapper, useThemeContext } from '@honda-canada/design-system-react';
import { ACURA_THEME_NAME } from '../../utils/constants';
import { getGtmTagValue } from '../../utils/gtmEvents';

export const ArrowContainer = ({ children, ...props }) => (
  <Box position="absolute" height="100%" top="0" display="flex" alignItems="center" {...props}>
    {children}
  </Box>
);

const StyledIconWrapper = styled(IconWrapper)(({ theme }) =>
  css({
    '&:focus-visible': {
      outline: `solid 8px ${theme.colors.aodaFocused}`,
    },
  }),
);

export const ArrowButton = ({ onClick, name, disabled = false, gtmTags, isDark, ...otherProps }) => {
  const { name: themeName, colors } = useThemeContext();
  const getIconColor = () => {
    if (isDark) {
      return disabled ? colors.grey[1] : 'white';
    }
    if (themeName === ACURA_THEME_NAME) {
      return disabled ? colors.grey[3] : colors.grey[0];
    }
    return disabled ? colors.grey[2] : colors.black;
  };

  return (
    <StyledIconWrapper
      onClick={onClick}
      onKeyDown={keypressCallback(keyCodes.ENTER, onClick)}
      as="button"
      backgroundColor={isDark ? 'black' : 'white'}
      border="none"
      cursor={!disabled ? 'pointer' : 'initial'}
      disabled={disabled}
      {...otherProps}
      data-gtm-model={getGtmTagValue(gtmTags?.modelName)}
      data-gtm-body-style={getGtmTagValue(gtmTags?.bodyStyle)}
      data-gtm-interaction-type={getGtmTagValue(gtmTags?.interactionType)}
      data-gtm-title={getGtmTagValue(gtmTags?.title)}
    >
      <Icon name={name} iconSize={['default', 'large']} color={getIconColor()} />
    </StyledIconWrapper>
  );
};
