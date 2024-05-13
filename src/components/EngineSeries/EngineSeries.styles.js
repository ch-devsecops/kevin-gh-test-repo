import styled from 'styled-components';
import { Box, ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

export const themeStyles = new ThemeStyles();

const Container = styled(Box)(({ margins }) =>
  css({
    mt: [
      margins?.topMarginMob ? margins?.topMarginMob : 'm',
      margins?.topMarginMob ? margins?.topMarginMob : 'm',
      margins?.topMargin ? margins?.topMargin : 'big',
    ],
    mb: [
      margins?.bottomMarginMob ? margins?.bottomMarginMob : 'l',
      margins?.bottomMarginMob ? margins?.bottomMarginMob : 'l',
      margins?.bottomMargin ? margins?.bottomMargin : 'big',
    ],
    mx: [
      margins?.horzMarginMob ? margins?.horzMarginMob : '10px',
      margins?.horzMarginMob ? margins?.horzMarginMob : 'm',
      margins?.horizontalMargin ? margins?.horizontalMargin : 'm',
    ],
  }),
);

themeStyles.addBaseStyles('StyledH5')(
  css({
    mt: ['m', 'default'],
    fontWeight: 'bold',
  }),
);

themeStyles.addBaseStyles('GridSectionContainer')(({ theme }) =>
  css({
    borderTop: theme.borders[1],
    borderTopColor: 'grey.0',
    mt: ['l', 'l', 'xxl'],
  }),
);

export default Container;
