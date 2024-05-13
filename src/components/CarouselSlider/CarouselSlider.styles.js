import css from '@styled-system/css';
import { ThemeStyles, IconWrapper } from '@honda-canada/design-system-react';
import styled from 'styled-components';

const themeStyles = new ThemeStyles();

export const StyledIconWrapper = styled(IconWrapper)(({ theme }) =>
  css({
    boxSizing: 'border-box',
    '&:focus': {
      border: 'transparent',
    },
    ...theme?.focused?.button(theme),
  }),
);

themeStyles.addBaseStyles('CarouselContainer')(({ centerAlign }) =>
  css({
    '& .splide:not( .is-overflow ) .splide__list': {
      justifyContent: centerAlign ? 'center' : 'normal',
    },
  }),
);

export default themeStyles;
