import React from 'react';
import { Copy, Box, Wrapper, Icon, IconWrapper, Media } from '@honda-canada/design-system-react';
import themeStyles from '../Gallery.styles';

const Container = themeStyles.apply(Box, 'PanelContainer');
const PanelButton = themeStyles.apply(Box, 'PanelButton');

export const ControlPanel = ({ strings, toggleThumbnails, toggleContent, isDark }) => (
  <Container backgroundColor={isDark ? 'black' : 'white'}>
    <PanelButton
      as="button"
      onClick={toggleContent}
      my={['zero', 's']}
      mx="xs"
      aria-label={strings.learnMoreAria}
      backgroundColor={isDark ? 'black' : 'white'}
    >
      <Copy size="small" fontFamily="heading" color={isDark ? 'white' : 'typographyDefault'}>
        {strings.learnMoreLabel}
      </Copy>
      <IconWrapper>
        <Icon color={isDark ? 'white' : 'black'} name="plus" />
      </IconWrapper>
    </PanelButton>

    <PanelButton
      as="button"
      onClick={toggleThumbnails}
      my={['zero', 's']}
      mx="xs"
      aria-label={strings.viewAllImagesAria}
      backgroundColor={isDark ? 'black' : 'white'}
    >
      <Copy size="small" fontFamily="heading" color={isDark ? 'white' : 'typographyDefault'}>
        {strings.viewAllImagesLabel}
      </Copy>
      <IconWrapper>
        <Icon color={isDark ? 'white' : 'black'} name="plus" />
      </IconWrapper>
    </PanelButton>
  </Container>
);

export const PanelContainer = ({ label, onClose, children, closeAriaLabel, isDark }) => (
  <Container p={['zero', 'zero', 'l']} backgroundColor={isDark ? 'black' : 'white'}>
    <Wrapper position="relative" px="0 !important">
      <PanelButton
        as="button"
        onClick={onClose}
        position="absolute"
        top="0"
        right="0"
        aria-label={closeAriaLabel}
        backgroundColor="transparent"
      >
        <Media greaterThan="smallDesktop">
          <Copy size="small" fontFamily="heading" color={isDark ? 'white' : 'typographyDefault'}>
            {label}
          </Copy>
        </Media>
        <IconWrapper>
          <Icon name="close" color={isDark ? 'white' : 'black'} />
        </IconWrapper>
      </PanelButton>
      {children}
    </Wrapper>
  </Container>
);
PanelContainer.defaultProps = {
  isDark: false,
};
