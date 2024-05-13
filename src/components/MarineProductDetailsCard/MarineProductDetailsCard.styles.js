import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('PriceComponentWrapper')(({ isMobile }) =>
  css({
    mt: isMobile ? '32px' : '22px',
    '> div:nth-child(1)': {
      pb: 0,
      mb: 0,
    },
  }),
);

export default themeStyles;
