import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Wrapper')(
  css({
    px: 'zero',
  }),
);

themeStyles.addBaseStyles('Container')(({ theme, isEditorActive, margins }) =>
  css({
    mt: [
      margins?.topMarginMob ? margins?.topMarginMob : 'xl',
      margins?.topMarginMob ? margins?.topMarginMob : 'xl',
      margins?.topMargin ? margins?.topMargin : 'big',
    ],
    mb: [
      margins?.bottomMarginMob ? margins?.bottomMarginMob : 'xl',
      margins?.bottomMarginMob ? margins?.bottomMarginMob : 'xl',
      margins?.bottomMargin ? margins?.bottomMargin : 'big',
    ],

    mx: [
      margins?.horzMarginMob ? margins?.horzMarginMob : 'zero',
      margins?.horzMarginMob ? margins?.horzMarginMob : 'zero',
      margins?.horizontalMargin ? margins?.horizontalMargin : 'm',
    ],
    minHeight: isEditorActive ? theme.space[10] : theme.space[8],
    pt: isEditorActive ? 'l' : undefined,
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-end',
    pr: '39px',
    '[aria-expanded="true"]:before': {
      transform: 'rotate(0deg)',
    },
  }),
);

themeStyles.addBaseStyles('ExpandButton')(({ theme }) =>
  css({
    fontFamily: 'bold',
    fontSize: '17px',

    '&::after, &::before': {
      width: theme.space.m,
      backgroundColor: 'primary',
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
  }),
);

themeStyles.addBaseStyles('Section')(({ theme }) =>
  css({
    borderTop: theme.borders[2],
    borderColor: 'grey.3',
    mt: 'default',
    px: ['0', '0'],
  }),
);

export default themeStyles;
