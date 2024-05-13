import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';
import { ACURA_THEME_NAME, HONDA_THEME_NAME, MC_THEME_NAME } from '../../utils/constants';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  css({
    width: '100%',
    height: '100%',
    minHeight: '300px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    color: 'white',
    padding: 'm',
    overflow: 'hidden',
  }),
);

themeStyles.addBaseStyles('ImageContainer')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  zIndex: 0,
});

themeStyles.addBaseStyles('Heading')(
  css({
    zIndex: 2,
    position: 'absolute',
    bottom: 'm',
    left: 'm',
    color: 'white',
    '> *': {
      color: ({ colors }) => `${colors.white} !important`,
    },
  }),
);

themeStyles.addBaseStyles('Gradient')({
  position: 'absolute',
  bottom: '0px',
  left: '0px',
  width: '100%',
  height: '100px',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 9.59%, #000000 100%)',
  opacity: '0.8',
  zIndex: 1,
});

// hover elements
themeStyles.addBaseStyles('SlideUp')(
  css({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '100%',
    left: '0px',
    transition: 'top',
    transitionDuration: 't4',
    transitionTimingFunction: 'default',
  }),
  ({ shouldAnimate }) =>
    shouldAnimate &&
    css({
      top: 0,
    }),
);

themeStyles.addBaseStyles('HoverBackground')(
  css({
    width: '100%',
    height: '100%',
    backgroundColor: 'darkBlue',
  }),
);

themeStyles.addThemeStyles(
  'HoverBackground',
  MC_THEME_NAME,
)(
  css({
    backgroundColor: 'red',
  }),
);

themeStyles.addBaseStyles('HoverContent')(
  css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    paddingX: 'm',
    paddingY: 'l',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // in IE, the hover content doesn't inherit the fade animation properties
    // adding the properties below to address the issue
    opacity: 'inherit',
    zIndex: 'inherit',
    color: 'white',
  }),
);

// set hover content Link color to 'white'
themeStyles.addBaseStyles('CtaContainer')(
  css({
    'a, span': {
      color: 'white',
      fontWeight: 'normal',
    },
  }),
);

themeStyles.addThemeStyles(
  'CtaContainer',
  ACURA_THEME_NAME,
)(
  css({
    svg: {
      path: {
        stroke: 'white',
      },
    },
  }),
);

themeStyles.addThemeStyles('CtaContainer', [HONDA_THEME_NAME, MC_THEME_NAME])(
  css({
    // need to explicitly set hover borderColor in honda and mc
    // it can't inherit base color due to how Link are styled in honda
    // `Link.styles.js`
    'a, span': {
      '&:hover, &:focus': {
        borderColor: 'white',
      },
    },
    svg: {
      path: {
        fill: 'white',
      },
    },
  }),
);

export default themeStyles;
