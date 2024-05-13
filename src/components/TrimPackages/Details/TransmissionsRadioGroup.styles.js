import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Copy')(({ isDark }) =>
  css({
    lineHeight: '24px',
    fontSize: ['sm', 'sm', '14px'],
    color: isDark ? 'white' : 'typographyDefault',
    textAlign: ['center', 'center', 'left'],
  }),
);

themeStyles.addBaseStyles('RadioGroup')(() =>
  css({
    marginLeft: ['l', 'l', 0],
    marginRight: ['xl', 'xl', 0],
    marginTop: ['xxs', 'xxs', 'xxs'],
    maxWidth: '360px',
  }),
);

export default themeStyles;
