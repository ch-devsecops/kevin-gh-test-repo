import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  css({
    px: ['default', 'default', 'default'],
    pt: ['xl', 'xl', 'xl'],
    pb: ['xl', 'xl', 'big'],
    display: 'flex',
  }),
);

themeStyles.addBaseStyles('TrimSpecificDisclaimer')(
  css({
    '> p': {
      fontSize: ['10px', '10px', '10px'],
      lineHeight: ['14px', '14px', '14px'],
    },
  }),
);

export default themeStyles;
