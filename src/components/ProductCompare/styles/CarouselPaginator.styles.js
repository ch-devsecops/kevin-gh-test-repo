import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  ({ paginationPaddingTop, setAbsoluteLeft, paginationControlWithShadow, paginationIsSticky, backgroundColor }) =>
    css({
      display: 'flex',
      mx: 'auto',
      mt: paginationPaddingTop,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '48px',
      left: setAbsoluteLeft,
      boxShadow: paginationControlWithShadow ? '0px -2px 4px rgba(0, 0, 0, 0.1)' : 'none',
      position: paginationIsSticky && 'fixed',
      bottom: 0,
      backgroundColor,
    }),
);

themeStyles.addBaseStyles('ArrowIconWrapper')(({ theme, disableArrow, backgroundColor }) =>
  css({
    boxSizing: 'border-box',
    display: 'flex',
    opacity: disableArrow ? 0.5 : 1,
    cursor: 'pointer',
    backgroundColor,
    '&:focus': {
      border: 'transparent',
    },
    ...theme?.focused?.button(theme),
  }),
);

export default themeStyles;
