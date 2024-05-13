import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';
import { MC_THEME_NAME } from '../../utils/constants';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  ({ inBiggerColumn }) =>
    css({
      border: '1px solid',
      borderColor: 'grey.2',
      backgroundColor: 'white',
      pt: inBiggerColumn ? ['xl', 'xxl'] : 'xl',
    }),
  {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
);

themeStyles.addBaseStyles('FeaturedText')(({ theme }) =>
  css({
    width: '100%',
    height: ['default', '36px'],
    textAlign: 'center',
    backgroundColor: theme.name === MC_THEME_NAME ? 'red' : 'blue',
    color: 'white',
    minWidth: '280px',
    maxWidth: ['100%', '280px'],
    py: ['xxs', 'xs'],

    // center absolute position
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    ml: 'auto',
    mr: 'auto',
  }),
);

themeStyles.addBaseStyles('Title')(({ linked }) =>
  css({
    width: '100%',
    minHeight: ['initial', linked ? '56px' : 'initial'],
    textAlign: 'center',
    mb: ['15px', 'default'],
    px: 's',
  }),
);

themeStyles.addBaseStyles('PricingContainer')(
  ({ theme, hasBanner }) => {
    const bgColor = theme.name === 'mc' ? 'red' : 'darkBlue';

    return css({
      backgroundColor: hasBanner ? bgColor : 'white',
      py: hasBanner ? ['xs', 'm'] : 0,
      mb: hasBanner ? 'default' : ['default', 'l'],
    });
  },
  ({ linked, hasBanner }) =>
    linked &&
    css({
      minHeight: [hasBanner ? '131px' : '144px', '222px', '186px'], // iOS and macOs fix
      maxHeight: ['131px', '222px', '186px'],
      height: '100%',
      py: [hasBanner ? 'xs' : 'default', 'default'],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      mb: '0 !important',

      // in IE: fix overflowing text
      '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
        minHeight: '186px',
      },
    }),
  {
    textAlign: 'center',
    width: '100%',
  },
);

themeStyles.addBaseStyles('SpecialOfferContainer')(
  css({
    alignContent: 'flex-start',
    position: 'absolute',
    width: 1 / 2,
    py: ['xxs', 'xs'],

    // in IE
    '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
      left: '-124px',
    },
  }),
);

themeStyles.addBaseStyles('HighlightText')(
  css({
    mb: ['xs', 'm'],
  }),
);

themeStyles.addBaseStyles('BannerText')(({ hasContent }) =>
  css({
    px: ['m', 'default'],
    mb: ['zero', hasContent && 'default', 'default'],
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: hasContent ? '76px' : [0, 0, '76px'],
    minHeight: hasContent ? '76px' : [0, 0, '76px'],
    bg: hasContent ? 'grey.3' : 'white',
  }),
);

export default themeStyles;
