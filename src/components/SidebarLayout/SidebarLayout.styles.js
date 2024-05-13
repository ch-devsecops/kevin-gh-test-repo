import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Wrapper')(({ theme }) =>
  css({
    display: 'flex',
    [`@media screen and (max-width:${theme.breakpoints[1]})`]: {
      flexDirection: 'column',
    },
    maxWidth: '1280px',
    margin: '0 auto',
  }),
);

themeStyles.addBaseStyles('Main')(({ theme }) =>
  css({
    [`@media screen and (min-width:${theme.breakpoints[1]})`]: {
      flexBasis: '75%',
      display: 'flex',
      paddingTop: 'l',
      paddingLeft: 'xxs',
      paddingRight: 'xxs',
    },
  }),
);

themeStyles.addBaseStyles('Sidebar')(({ theme }) =>
  css({
    [`@media screen and (min-width:${theme.breakpoints[1]})`]: {
      height: '100vw',
      flexBasis: '25%',
    },
  }),
);

themeStyles.addBaseStyles('MainContent')(({ theme }) =>
  css({
    background: 'white',
    [`@media screen and (min-width:${theme.breakpoints[1]})`]: {
      maxWidth: '1110px',
      width: '100%',
    },
  }),
);

themeStyles.addBaseStyles('SidebarContent')(({ theme }) =>
  css({
    [`@media screen and (min-width:${theme.breakpoints[1]})`]: {
      maxWidth: '330px',
    },
  }),
);

export default themeStyles;
