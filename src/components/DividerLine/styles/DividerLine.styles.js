import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Divider')(
  css({
    marginY: 'm',
  }),
);

export default themeStyles;
