import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Wrapper')(() =>
  css({
    mt: '32px',
    ml: '30px',
    mr: '30px',
    mb: '32px',
  }),
);

themeStyles.addBaseStyles('TitleCopy')(() =>
  css({
    fontFamily: 'bold',
    fontSize: '14px',
    lineHeight: '24px',
  }),
);

themeStyles.addBaseStyles('Button')(() =>
  css({
    width: '100%',
    mt: '8px',
    mb: '8px',
  }),
);

export default themeStyles;
