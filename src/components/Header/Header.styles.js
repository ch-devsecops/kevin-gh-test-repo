import css from '@styled-system/css';
import variant from '@styled-system/variant';
import { css as styledCss, keyframes } from 'styled-components';
import { ThemeStyles, drawerThemeStyles } from '@honda-canada/design-system-react';

import deepClone from '../../utils/object/deepClone';

const themeStyles = new ThemeStyles();
export const HeaderBarButtonPadding = 16;

const text = {
  fontFamily: 'default',
  fontWeight: 'regular',
  fontSize: 'default',
  letterSpacing: 'sm',
  color: 'typographyDefault',
};

const title = {
  ...text,
  fontFamily: 'bold',
};

themeStyles.addBaseStyles('Container')(
  css({
    height: '100%',
    width: '100%',
    paddingX: ['xxs', 'xxs', 'm'],
  }),
);

themeStyles.addBaseStyles('Row')(({ theme }) =>
  css({
    width: 'initial',
    maxWidth: 'initial',
    height: '100%',
    marginY: 0,
    marginX: [`-${theme?.space.xxs}px`, `-${theme?.space.xxs}px`, `-${theme?.space.m}px`],
  }),
);

themeStyles.addBaseStyles('Column')(({ display, alignItems }) =>
  css({
    display: display || 'flex',
    height: '100%',
    paddingX: ['xxs', 'xxs', 'm'],
    alignItems: alignItems || 'center',
  }),
);

themeStyles.addBaseStyles('Nav')(({ height, headerHiddenOnScroll }) =>
  css({
    fontFamily: 'default',
    color: 'typographyDefault',
    position: headerHiddenOnScroll ? ' relative' : 'sticky',
    height,
    top: 0,
    zIndex: 1020,
  }),
);

themeStyles.addBaseStyles('Logo')(({ theme, width, height, mr }) =>
  css({
    paddingY: ['xs', 'xs', 'm'],
    mr: 'l',
    '@media screen and (min-width: 970px) and (max-width: 1200px)': {
      mr: mr ?? 'l',
    },
    display: 'flex',
    alignItems: 'center',
    ...theme?.focused?.textLink(theme),
    img: {
      height: height || ['initial', 'initial', 'initial'],
      width: width || 'initial',
    },
  }),
);

themeStyles.addBaseStyles('HeaderBar')(({ height, paddingTop }) =>
  css({
    height,
    padding: '0',
    paddingTop,
    position: 'relative',
    backgroundColor: 'white',
  }),
);

themeStyles.addBaseStyles('HeaderMobileMenuButton')(({ theme }) =>
  css({
    // reset button styles
    border: 'none',
    background: 'transparent',

    outline: 'none',
    display: ['flex', 'flex', 'none'],
    marginRight: 'xxs',
    width: '45px',
    ...theme?.focused?.textLink(theme),
  }),
);

themeStyles.addBaseStyles('ActionLink')(
  ({ theme, stretchedLink }) =>
    css({
      ...title,
      borderBottom: theme?.borders[1],
      borderBottomColor: 'transparent',
      '> span': {
        ...title,
        display: 'inline-block',
        transitionTimingFunction: 'default',
        transitionDuration: 't4',
        borderBottom: theme?.borders[1],
        borderBottomColor: 'transparent',
      },
      ':hover,:focus': {
        ...title,
        borderBottom: theme?.borders[1],
        borderBottomColor: 'transparent',
      },
      ':hover span,:focus span': {
        transitionTimingFunction: 'default',
        transitionDuration: 't4',
        borderBottom: theme?.borders[1],
        borderBottomColor: 'primary',
        outline: 'transparent',
      },
      ...theme?.focused?.textLink(theme),
      ...(stretchedLink && {
        '&:focus-visible': {
          outline: 'transparent',
        },
        '&:focus-visible:after': {
          outline: theme?.borders[8],
          outlineColor: 'aodaFocused',
        },
        '&:after': {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
          content: '""',
        },
      }),
    }),
  ({ fontFamily }) => fontFamily && css({ fontFamily, '> span': { fontFamily } }),
);

themeStyles.addBaseStyles('ActionIcon')(({ theme }) =>
  css({
    marginLeft: 'xs',
    height: `${theme?.space.xs}px`,
    '> path': {
      fill: 'primary',
    },
  }),
);

themeStyles.addBaseStyles('LangMenu')(({ theme }) =>
  css({
    display: ['none', 'none', 'block'],
    height: 'initial',
    padding: 'm',
    ...title,
    textAlign: 'right',
    backgroundColor: 'grey.5',
    boxShadow: theme?.shadows.smooth.md,
  }),
);

themeStyles.addBaseStyles('LangItem')(({ theme, textDecoration }) =>
  css({
    display: 'block',
    margin: 0,
    marginTop: 'm',
    paddingY: 0,
    paddingX: 'xs',
    ...text,
    textDecoration,
    borderBottom: theme?.borders[1],
    borderBottomColor: 'transparent',
    ':first-child': {
      marginTop: 0,
    },
    ':hover': {
      ...text,
      textDecoration,
      borderBottom: theme?.borders[1],
      borderBottomColor: 'primary',
    },
    ...theme?.focused?.textLink(theme),
  }),
);

themeStyles.addBaseStyles('NavItem')(
  ({ visible, theme, px, display, maxHeight, lineHeight }) =>
    css({
      // reset button styles
      border: 'none',
      background: 'transparent',

      display: display || 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      width: ['45px', '45px', 'initial'],
      maxHeight,
      lineHeight,
      ...title,
      textDecoration: 'none',
      textAlign: 'center',
      paddingY: 0,
      paddingX: px ?? [0, HeaderBarButtonPadding],
      '@media screen and (min-width: 970px) and (max-width: 1200px)': {
        paddingX: '5px',
      },
      position: 'relative',
      borderBottom: theme?.borders[3],
      borderBottomColor: 'transparent',
      ':hover': {
        color: 'typographyDefault',
        textDecoration: 'none',
      },
      ...theme?.focused?.textLink(theme),
      '> svg': {
        margin: 0,
        width: '14px',
      },
      '> span': {
        ...title,
        height: '100%',
        display: ['none', 'none', 'inline-block'],
        borderBottom: theme?.borders[3],
        borderBottomColor: 'transparent',
        ':hover': {
          borderBottomColor: visible ? 'transparent' : 'primary',
        },
      },
    }),
  ({ theme, visible }) =>
    variant({
      prop: 'type',
      variants: {
        language: {
          paddingLeft: 0,
          paddingRight: 0,
          display: ['none', 'none', 'inline-block'],
          borderBottom: theme?.borders[3],
          borderBottomColor: 'transparent',
          ':hover': {
            borderBottomColor: 'transparent',
          },
          '> span': {
            ...title,
            display: ['none', 'none', 'inline-block'],
            borderBottom: theme?.borders[3],
            borderBottomColor: visible ? 'primary' : 'transparent',
            ':hover': {
              borderBottomColor: 'primary',
            },
          },
        },
      },
    }),
  ({ fontFamily }) => fontFamily && css({ fontFamily, '> span': { fontFamily } }),
  ({ fontSize }) => fontSize && css({ fontSize, '> span': { fontSize } }),
);

themeStyles.addBaseStyles('NavIconWrapper')(
  css({
    height: '100%',
    width: 'inherit',
  }),
);

themeStyles.addBaseStyles('NavIcon')(
  css({
    maxHeight: '20px',
    maxWidth: '20px',
    mr: [0, 0, 's'],
    objectFit: 'contain',
  }),
);

themeStyles.addBaseStyles('NavAnimation')(({ width = 0, left = 0 }) =>
  css({
    opacity: 1,
    bottom: '2px',
    left,
    height: '3px',
    width,
    margin: 0,
    position: 'absolute',
    backgroundColor: 'primary',
    border: 'none',
    borderRadius: '1rem',
    transitionTimingFunction: 'default',
    transitionDuration: 't4',
  }),
);

const slideUpDown = keyframes`
  0% {
    transform: translateY(-201%) translateZ(0);
  }
  100% {
    transform: translateY(0%) translateZ(0);
  }
`;

themeStyles.addBaseStyles('MegaMenu')(
  ({ firstOpen }) =>
    css({
      position: 'fixed',
      top: '75px',
      left: 0,
      right: 0,
      backgroundColor: 'grey.5',
      transform: 'translateY(-201%) translateZ(0)',
      transition: 'none',
      zIndex: -1,
      maxHeight: 'calc(100vh - 75px)',
      display: firstOpen ? 'none' : 'flex',
      flexWrap: 'wrap',
      marginTop: -30,
      paddingY: 'xl',
      pointerEvents: 'none',
      visibility: 'hidden',
      boxShadow: 'smooth.md',
    }),
  ({ isOpen, firstOpen }) =>
    isOpen &&
    css({
      display: 'flex',
      transform: firstOpen ? '' : 'translateY(0%) translateZ(0)',
      transitionTimingFunction: 'default',
      transitionDuration: 't4',
      transitionProperty: 'transform',
      marginTop: 0,
      pointerEvents: 'auto',
      visibility: 'visible',
    }),
  // TODO add to themeStyles function to add animation
  // Something like themeStyles.addAnimation(${slideUpDown} .8s ease-in-out)
  () => () => styledCss`animation: ${slideUpDown} .8s ease-in-out`,
);

themeStyles.addBaseStyles('MegaMenuMask')(
  css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 0,
    backgroundColor: '#00000060',
    opacity: 0,
    transition: 'opacity .2s linear,height 0s ease .2s',
    pointerEvents: 'none',
    zIndex: 1019,
  }),
  ({ isOpen }) =>
    isOpen &&
    css({
      height: '100%',
      opacity: '1',
      transition: 'none',
      pointerEvents: 'auto',
    }),
);

themeStyles.addBaseStyles('DrawerLink')(({ theme, fontFamily }) =>
  css({
    // reset button styles
    border: 'none',
    background: 'transparent',
    width: 'calc(100% - 32px)',

    ...title,
    lineHeight: 'xs',
    height: 'initial',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginY: '0',
    marginX: 'm',
    paddingY: 's',
    paddingX: '0',
    borderBottom: theme?.borders[1],
    borderBottomColor: 'grey.2',
    textDecoration: 'none',
    fontFamily,
    ':focus': {
      borderBottom: theme?.borders[1],
      borderBottomColor: 'grey.2',
    },
    ...theme?.focused?.textLink(theme),
    outlineOffset: `0 -${theme?.space.m}px`,
  }),
);

themeStyles.addBaseStyles('DrawerButton')(({ theme }) =>
  css({
    ...title,
    lineHeight: 'xs',
    height: 'initial',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginY: '0',
    marginX: 'm',
    paddingY: 's',
    paddingX: '0',
    borderBottom: theme?.borders[1],
    borderBottomColor: 'grey.2',
    ':focus': {
      borderBottom: theme?.borders[1],
      borderBottomColor: 'grey.2',
    },
    ...theme?.focused?.textLink(theme),
    outlineOffset: `0 -${theme?.space.m}px`,
  }),
);

themeStyles.addBaseStyles('DrawerFooter')(({ theme }) =>
  css({
    ...title,
    lineHeight: 'xs',
    height: 'initial',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginY: '0',
    marginX: 'm',
    paddingY: 's',
    paddingX: '0',
    borderTop: theme?.borders[1],
    borderTopColor: 'grey.3',
    ':focus': {
      borderTopColor: 'grey.3',
      borderBottomColor: 'transparent',
    },
    ...theme?.focused?.textLink(theme),
    outlineOffset: `0 -${theme?.space.m}px`,
  }),
);

themeStyles.addBaseStyles('NavContainer')(
  css({
    justifyContent: 'space-between',
  }),
);

themeStyles.addBaseStyles('NavList')(
  css({
    display: 'flex',
  }),
);

/**
 * Override Drawer styled
 */
const customDrawerThemeStyles = deepClone(drawerThemeStyles);

customDrawerThemeStyles.mergeBaseStyles('DrawerBody')(
  css({
    paddingTop: 0,
    paddingX: 'xxs',
  }),
);

customDrawerThemeStyles.mergeBaseStyles('DrawerFooter')(
  css({
    paddingX: 'xxs',
  }),
);

customDrawerThemeStyles.mergeBaseStyles('DrawerHeader')(
  css({
    backgroundColor: 'grey.5',
    textAlign: 'center',
    height: ['45px', '45px', '45px'],
  }),
);

customDrawerThemeStyles.mergeBaseStyles('DrawerHeaderTitle')(
  css({
    ...title,
    textAlign: 'center',
  }),
);

customDrawerThemeStyles.mergeBaseStyles('DrawerClose')(({ theme }) =>
  css({
    ':focus-visible': {
      outlineOffset: '0',
      ...theme?.focused?.textLink(theme),
    },
  }),
);

export { customDrawerThemeStyles };

export default themeStyles;
