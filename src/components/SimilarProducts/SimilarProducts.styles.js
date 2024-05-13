import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(() =>
  css({
    mt: 'xl',
    mb: ['xl', 'xl', 'big'],
    mx: ['zero', 'zero', 'auto'],
  }),
);

themeStyles.addBaseStyles('Wrapper')(() =>
  css({
    mt: ['xl', 'xl', 'big'],
  }),
);

themeStyles.addBaseStyles('Cell')(() =>
  css({
    display: 'flex',
    pr: 'zero',
    width: '100%',
    justifyContent: 'center',
    mt: ['m', 'default', 'xl'],
  }),
);

themeStyles.addBaseStyles('Header')(() =>
  css({
    textAlign: 'center',
    mb: ['default', 'xl', 'xl'],
    mx: 'auto',
  }),
);

themeStyles.addBaseStyles('CTAButton')(({ theme }) =>
  css({
    [`@media screen and (max-width:${theme.breakpoints[1]})`]: {
      minWidth: '180px',
    },
  }),
);

export default themeStyles;
