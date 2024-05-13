import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Grid')(({ theme, gridTemplateColumnsCount }) =>
  css({
    display: 'grid',
    gridTemplateColumns: gridTemplateColumnsCount
      ? `repeat(${gridTemplateColumnsCount},1fr)`
      : ['repeat(2,1fr)', 'repeat(3,1fr)', 'repeat(4,1fr)'],
    gridColumnGap: '0',
    justifyItems: 'center',
    [`@media only screen and (min-width:${theme.breakpoints[1]}) and (max-width:${theme.breakpoints[2]})`]: {
      gridTemplateColumns: gridTemplateColumnsCount ? `repeat(${gridTemplateColumnsCount},1fr)` : 'repeat(3,1fr)',
    },
    [`@media only screen and (width:${theme.breakpoints[0]})`]: {
      gridTemplateColumns: gridTemplateColumnsCount ? `repeat(${gridTemplateColumnsCount},1fr)` : 'repeat(2,1fr)',
    },
  }),
);

themeStyles.addBaseStyles('Container')(({ theme }) =>
  css({
    [`@media only screen and (min-width:${theme.breakpoints[1]}) and (max-width:${theme.breakpoints[2]})`]: {
      maxWidth: theme.breakpoints[1],
      mx: 'xl',
    },
  }),
);

themeStyles.addBaseStyles('Cell')(({ theme, shouldRenderBorderBottom }) =>
  css({
    display: 'flex',
    pr: 'zero',
    width: '100%',
    justifyContent: 'center',
    mt: ['m', 'default', 'xl'],
    [`@media only screen and (max-width:${theme.breakpoints[0]})`]: {
      borderBottom: shouldRenderBorderBottom && theme.borders[1],
      borderBottomColor: 'grey.2',
    },
    [`@media only screen and (min-width:${theme.breakpoints[0]})`]: {
      borderBottom: 'none',
    },
  }),
);

export default themeStyles;
