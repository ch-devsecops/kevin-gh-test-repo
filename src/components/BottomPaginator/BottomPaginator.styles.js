import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  css({
    display: 'flex',
    alignItems: 'center',
  }),
);

export default themeStyles;
