import styled from 'styled-components';
import { Box, ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

export const themeStyles = new ThemeStyles();

const Container = styled(Box)(() =>
  css({
    mt: ['xl', 'big', 'big'],
    mb: ['xl', 'big', 'big'],
    mx: ['10px', 'm', 'm'],
  }),
);

themeStyles.addBaseStyles('GridSectionContainer')(() =>
  css({
    mt: ['l', 'l', 'xxl'],
  }),
);

themeStyles.addBaseStyles('Container')(() =>
  css({
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'top',
    px: ['default', 'zero'],
  }),
);

themeStyles.addBaseStyles('StyledSplide')(({ theme }) =>
  css({
    '&:focus': {
      border: 'transparent',
    },
    '&:focus-visible': {
      border: `solid 8px ${theme.colors.aodaFocused}`,
    },
  }),
);

themeStyles.addBaseStyles('Cell')(() =>
  css({
    display: 'flex',
    pr: 'zero',
    width: '100%',
    justifyContent: 'center',
    mt: ['m', 'default', 'xl'],
  }),
);

export default Container;
