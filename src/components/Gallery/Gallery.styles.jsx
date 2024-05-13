import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';
import { ACURA_THEME_NAME } from '../../utils/constants';

const themeStyles = new ThemeStyles();

export const buttonStyles = {
  border: 'none',
  cursor: 'pointer',
};

themeStyles.addBaseStyles('CarouselContainer')(
  ({ mobileLandscapeHt }) =>
    mobileLandscapeHt && {
      '@media only screen and (max-device-width:767px) and (orientation: landscape)': {
        height: mobileLandscapeHt,
      },
    },
);

themeStyles.addBaseStyles('ContentWrapper')(
  css({
    height: '100%',
    position: 'relative',
    display: 'flex',
  }),
);

themeStyles.addBaseStyles('ThumbnailControlsContainer')(
  css({
    height: '48px',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: ['zero', 'zero', 's'],

    '@media only screen and (max-device-width:767px) and (orientation: landscape)': {
      px: '124px',
    },
  }),
);

themeStyles.addBaseStyles('ThumbnailContainer')(
  ({ theme }) =>
    css({
      ...buttonStyles,
      height: ['49px', '112px', '121px'], // 117 (based in design) + 4 (border bottom height)
      padding: '0 !important', // override button and column default padding
      borderBottom: '4px solid',
      borderColor: 'transparent',
      zIndex: 2, // ios fix for bottom border
      boxSizing: 'border-box',
      '&:focus-visible': {
        border: `solid 8px ${theme.colors.aodaFocused}`,
      },

      '.thumbnail-border': {
        width: 0,
        transition: 'all',
        transitionDuration: 't5',
        transitionTimingFunction: 'default',
      },

      '@media screen and (min-width:992px)': {
        '&:hover': {
          '.thumbnail-border': {
            width: '100%',
          },
        },
      },

      '@media only screen and (max-device-width:767px) and (orientation: landscape)': {
        height: '84px',
      },
    }),
  ({ isActive }) =>
    isActive &&
    css({
      borderColor: 'red',
    }),
);

themeStyles.addBaseStyles('SlideContainer')({
  // makes images respond to the aspect ratio
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  img: {
    height: 'auto !important',
  },
});

themeStyles.addBaseStyles('GalleryTab')(
  ({ theme }) =>
    css({
      ...buttonStyles,
      height: '100%',
      zIndex: 2,
      borderBottom: '4px solid transparent',
      cursor: 'pointer',
      py: ['s', 'm'],
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      '&:focus-visible': {
        border: `solid 8px ${theme.colors.aodaFocused}`,
      },
    }),
  ({ isActive }) =>
    isActive &&
    css({
      borderBottom: '4px solid',
      borderColor: 'red',
    }),
);

themeStyles.addBaseStyles('GalleryTabTitle')(({ theme }) =>
  css({
    fontFamily: theme.name === ACURA_THEME_NAME ? 'heading' : 'bold',
  }),
);

themeStyles.addBaseStyles('FullScreenButton')(({ theme }) =>
  css({
    ...buttonStyles,
    px: ['4px !important', '4px !important', '6px'],
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    boxSizing: 'border-box',
    '&:focus-visible': {
      border: `solid 8px ${theme.colors.aodaFocused}`,
    },
  }),
);

themeStyles.addBaseStyles('CloseButton')(({ theme }) =>
  css({
    ...buttonStyles,
    padding: '0 !important', // further padding overrides for browser default styling
    borderRadius: '50%',
    background: 'white',
    height: '30px',
    width: '30px',
    boxSizing: 'border-box',
    '&:focus-visible': {
      border: `solid 8px ${theme.colors.aodaFocused}`,
    },

    ':disabled': {
      cursor: 'initial',
    },
  }),
);

themeStyles.addBaseStyles('MobileInfoLabel')(
  css({
    display: 'none',
    alignItems: 'center',
    height: '54px',
    px: 'l',
    backgroundColor: 'white',
    width: '100%',

    '@media only screen and (max-device-width:767px) and (orientation: portrait)': {
      display: 'flex',
    },
  }),
);

// full screen mode components
themeStyles.addBaseStyles('FullScreenContainer')(
  css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'black',
  }),
);

themeStyles.addBaseStyles('PanelContainer')(
  css({
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('PanelButton')(({ theme }) =>
  css({
    ...buttonStyles,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'heading',
    boxSizing: 'border-box',
    '&:focus-visible': {
      border: `solid 8px ${theme.colors.aodaFocused}`,
    },
  }),
);

export default themeStyles;
