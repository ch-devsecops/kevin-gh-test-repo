import css from '@styled-system/css';
import { ThemeStyles, drawerThemeStyles } from '@honda-canada/design-system-react';
import cloneDeep from 'lodash/cloneDeep';

const compareDrawerThemeStyles = cloneDeep(drawerThemeStyles);
const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('ScrollableCardsContainer')(
  css({
    display: 'flex',
    justifyContent: 'center',
    gap: ['xs', 's', 'default'],
    '@media only screen and (max-width: 373px)': {
      width: '100%',
      pr: ['20px', 0],
      pl: ['200px', 0],
      '::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      overflowX: 'scroll',
    },
    // ToDo Test the ScrollableCardsContainer in BrowserStack when page is ready
    '@media only screen and (min-width: 374px) and (max-width: 500px)': {
      width: '100%',
      pr: ['20px', 0],
      pl: ['130px', 0],
      '::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      overflowX: 'scroll',
    },
  }),
);

themeStyles.addBaseStyles('ModelCard')(({ theme }) =>
  css({
    position: 'relative',
    width: ['116px', '116px', '148px'],
    minWidth: ['116px', '116px', '148px'],
    px: ['xxs', 'xxs', 's'],
    pt: ['xs', 'xs', 'l'],
    pb: ['xxs', 'xxs', 'default'],
    height: ['98px', '98px', '178px'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'default',
    backgroundColor: 'white',
    border: theme.borders[1],
    borderColor: 'black',
    ...theme?.focused?.card(theme),
    outlineOffset: '-8px',
  }),
);

themeStyles.addBaseStyles('EmptyCard')(
  css({
    display: 'block',
    my: 'auto',
    fontSize: 'sm',
    lineHeight: '16px',
    px: 'zero',
    textAlign: 'center',
    color: 'grey.0',
    cursor: 'no-drop',
    userSelect: 'none',
  }),
);

themeStyles.addBaseStyles('CardWrapper')(
  css({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: ['space-between', 'space-evenly', 'space-between'],
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('CardTitle')(
  css({
    fontFamily: 'bold',
    cursor: 'pointer',
    width: ['107px', '107px', '132px'],
    textAlign: 'center',
    fontSize: 'sm',
    lineHeight: '16px',
  }),
);

themeStyles.addBaseStyles('CardImage')(
  css({
    objectFit: 'contain',
    width: ['95px', '95px', '121px'],
    maxHeight: ['49px', '49px', '74px'],
  }),
);

themeStyles.addBaseStyles('IconWrapper')(({ theme }) =>
  css({
    position: 'absolute',
    top: ['-1px', '8px'],
    right: ['3px', '8px'],
    cursor: 'pointer',
    ...theme?.focused?.button(theme),
  }),
);

export { compareDrawerThemeStyles };

export default themeStyles;
