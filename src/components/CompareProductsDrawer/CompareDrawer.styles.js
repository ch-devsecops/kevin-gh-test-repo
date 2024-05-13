import css from '@styled-system/css';
import { ThemeStyles, drawerThemeStyles } from '@honda-canada/design-system-react';
import cloneDeep from 'lodash/cloneDeep';

const compareDrawerThemeStyles = cloneDeep(drawerThemeStyles);
const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('DrawerContainer')(({ isVisible, isIntersected, bottomElementHeight, isBackToTopHidden }) =>
  css({
    width: '100%',
    height: isVisible ? ['236px', '281px'] : '44px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    bottom: isVisible && isIntersected && !isBackToTopHidden ? bottomElementHeight : '0',
    zIndex: isIntersected ? '1' : '13000',
    transition: 'height 0.3s cubic-bezier(.23,1,.32,1)',
  }),
);

compareDrawerThemeStyles.mergeBaseStyles('DrawerWrapperBody')(
  css({
    margin: 0,
    padding: 0,
    py: ['m', '28px'],
    px: ['20px', 0],
    height: '100%',
    backgroundColor: 'grey.3',
  }),
);

compareDrawerThemeStyles.mergeBaseStyles('DrawerBody')(
  css({
    padding: 0,
    margin: 'auto',
    height: '100%',
    width: '100%',
    gap: 'm',
    display: 'flex',
    flexDirection: ['column', 'row'],
    justifyContent: 'center',
  }),
);

themeStyles.addBaseStyles('SemiHexagonButton')(
  ({ theme, isVisible, isIntersected, bottomElementHeight, isBackToTopHidden }) =>
    css({
      alignItems: 'center',
      backgroundColor: 'grey.3',
      display: 'flex',
      height: '45px',
      margin: 'auto',
      position: 'relative',
      width: 'max-content',
      bottom: !isVisible && isIntersected && !isBackToTopHidden ? bottomElementHeight : '0',
      zIndex: '999',
      transition: 'bottom 0.3s cubic-bezier(.23,1,.32,1)',
      '&:before': {
        position: 'absolute',
        content: '""',
        top: '0',
        left: '-43px',
        width: '0',
        height: '0',
        borderBottom: '45px solid',
        borderBottomColor: 'grey.3',
        borderLeft: '44px solid transparent',
      },
      '&:after': {
        position: 'absolute',
        content: '""',
        top: '0',
        right: '-43px',
        width: '0',
        height: '0',
        borderBottom: '45px solid',
        borderBottomColor: 'grey.3',
        borderRight: '44px solid transparent',
      },
      '&:hover': {
        borderBottom: 'none',
        textDecoration: 'none',
      },
      '&:active': {
        '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
      },
      ...theme?.focused?.button(theme),
      outlineOffset: '-8px',
    }),
);

themeStyles.addBaseStyles('SemiHexagonTitle')(({ isVisible, theme }) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    fontSize: '16px',
    lineHeight: '26px',
    mx: 'xs',
    '>svg': {
      rotate: isVisible ? '0deg' : '180deg',
      transition: 'rotate .3s cubic-bezier(.23,1,.32,1)',
    },
    ...theme?.focused?.textLink(theme),
    outlineOffset: '-4px',
  }),
);

themeStyles.addBaseStyles('DrawerWrapper')(({ isVisible, theme }) =>
  css({
    width: '100%',
    height: isVisible ? ['192px', '237px', '237px'] : '0px',
    backgroundColor: 'grey.3',
    display: isVisible ? 'flex' : 'block',
    flexDirection: ['column', 'row'],
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'default',
    zIndex: '998',
    ...theme?.focused?.card(theme),
    outlineOffset: '-8px',
  }),
);

themeStyles.addBaseStyles('CardsContainer')(
  css({
    display: 'flex',
    justifyContent: 'center',
    gap: ['xs', 's', 'default'],
    overflowX: ['scroll', 'hidden'],
    '@media only screen and (max-width: 373px)': {
      width: '100%',
      pl: ['70px', 0],
      pr: ['20px', 0],
    },
  }),
);

themeStyles.addBaseStyles('ModelCard')(({ theme }) =>
  css({
    position: 'relative',
    p: ['4px', '7px 10px'],
    minWidth: ['78px', '124px', '148px'],
    height: ['98px', '178px'],
    width: ['78px', '124px', '148px'],
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
    px: ['xxs', '27px'],
    fontSize: ['sm', '14px'],
    textAlign: 'center',
    lineHeight: ['18px', 'md'],
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
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('CardTitle')(
  css({
    fontFamily: 'bold',
    fontSize: '14px',
    lineHeight: ['sm', '24px'],
    cursor: 'pointer',
  }),
);

themeStyles.addBaseStyles('CardImage')(
  css({
    width: ['40px', '100px'],
    maxHeight: ['68px', '130px'],
    objectFit: 'contain',
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

themeStyles.addBaseStyles('ButtonGroup')(
  css({
    width: ['100%', '150px', '150px'],
    maxHeight: ['98px', '208px'],
    display: 'flex',
    flexDirection: ['row', 'column'],
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('Button')(({ theme }) =>
  css({
    width: ['132px', '147px'],
    minWidth: 'unset',
    fontWeight: ['700', '533'],
    lineHeight: ['22px', '19px'],
    px: 'zero',
    ...theme?.focused?.button(theme),
  }),
);

export { compareDrawerThemeStyles };

export default themeStyles;
