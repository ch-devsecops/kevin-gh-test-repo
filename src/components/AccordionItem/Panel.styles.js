import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ theme, margins = {} }) =>
  css({
    borderBottom: theme.borders[2],
    borderColor: 'grey.3',
    '[aria-expanded="true"]:before': {
      transform: 'rotate(0deg)',
    },
    '[aria-hidden="true"]': {
      mt: 0,
      mb: 0,
      mx: [margins?.innerHorzMarginMob, margins?.innerHorzMarginMob, margins?.innerHorzMargin],
    },
    '[aria-hidden="false"]': {
      mt: [margins?.innerTopMarginMob, margins?.innerTopMarginMob, margins?.innerTopMargin],
      mb: [margins?.innerBottomMarginMob, margins?.innerBottomMarginMob, margins?.innerBottomMargin],
      mx: [margins?.innerHorzMarginMob, margins?.innerHorzMarginMob, margins?.innerHorzMargin],
    },
  }),
);

themeStyles.addBaseStyles('Item')(({ theme, isEditorActive }) =>
  css({
    position: 'relative',
    width: '100%',
    pl: ['15px', 'default', 'l'],
    pr: 'xl',
    py: 'zero',
    transition: 'color 0.2s linear',
    cursor: 'pointer',

    '&::after, &::before': {
      width: theme.space.m,
      backgroundColor: 'black',
      content: '""',
      position: 'absolute',
      right: ['11px', 'm'],
      top: '50%',
      height: '2px',
      marginTop: '-2px',
    },

    '&::before': {
      transform: 'rotate(-90deg)',
      transition: 'transform 200ms ease-in-out 0s',
    },
    minHeight: isEditorActive ? theme.space[7] : [theme.space[6], theme.space[8]],
    pt: isEditorActive ? 'l' : undefined,
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    fontFamily: 'bold',
    pointerEvents: 'auto',
    pb: ['xs', 'default', 'l'],
    pt: ['s', 'default', 'l'],
    lineHeight: ['1.3', 'sm'],
    fontSize: ['m', '20px'],
  }),
);

themeStyles.addBaseStyles('Content')(({ isActive }) =>
  css({
    overflow: 'hidden',
    willChange: 'height',
    transition: 'margin ease 300ms, height ease 300ms',
    '& > *': {
      transition: 'visibility 400ms',
      visibility: !isActive && 'hidden',
    },
  }),
);

export default themeStyles;
