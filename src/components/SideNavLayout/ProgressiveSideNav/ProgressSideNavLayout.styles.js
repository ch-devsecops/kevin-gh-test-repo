import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  css({
    display: 'flex',
    height: 'fit-content',
    minWidth: '100%',
    minHeight: '100px',
    flexDirection: ['column', 'column', 'row'],
  }),
);

export default themeStyles;
