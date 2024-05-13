import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('StyledH5')(({ isDark }) =>
  css({
    a: {
      color: isDark ? 'white' : 'typographyDefault',
      textDecoration: 'none',
    },
  }),
);

themeStyles.addBaseStyles('TrimCardImageLink')(({ theme }) =>
  css({
    '&:focus-visible': {
      outline: `8px solid ${theme.colors.someFocused}`,
    },
  }),
);

themeStyles.addBaseStyles('PaymentDetailsContainer')(() =>
  css({
    my: 'm',
    minHeight: '60px',
    width: '100%',
  }),
);

themeStyles.addBaseStyles('PaymentDetailsContent')(() =>
  css({
    display: 'flex',
    pt: 'm',
    margin: 'auto',
    maxWidth: [undefined, undefined, '280px'],
  }),
);

export default themeStyles;
