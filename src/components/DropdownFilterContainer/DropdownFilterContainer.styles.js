import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('StyledButton')(
  css({
    minWidth: '230px',
  }),
);

export default themeStyles;
