import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ margins, flexDesktopAlignment }) =>
  css({
    display: 'flex',
    flexDirection: ['column', 'column', 'row'],
    justifyContent: ['space-around', 'space-around', flexDesktopAlignment],
    flexWrap: 'wrap',
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
      margins?.horizontalMargin ? margins?.horizontalMargin : 'auto',
    ],
  }),
);

export default themeStyles;
