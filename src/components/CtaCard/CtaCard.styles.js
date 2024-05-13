import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ theme }) =>
  css({
    backgroundColor: theme.colors.secondary,
    width: 'auto',
    mb: 'l',
    mx: 'auto',
    maxWidth: '278px',
    color: 'white',
    paddingBottom: '20px',
    padding: '10px 24px 10px 24px',
    borderRadius: '4px',
  }),
);

themeStyles.addBaseStyles('CtaButton')(({ theme }) =>
  css({
    minWidth: '100%',
    padding: '10px',
    marginBottom: '10px',
    marginTop: '10px',
    backgroundColor: theme.colors.secondary,
    color: 'white',
  }),
);

themeStyles.addBaseStyles('MainText')(({ theme }) =>
  css({
    color: theme.colors.white,
    py: 's',
    fontFamily: 'bold',
    fontSize: '18px',
  }),
);

themeStyles.addBaseStyles('SubText')(({ theme }) =>
  css({
    color: theme.colors.white,
    py: 's',
    fontSize: '12px',
    paddingBottom: '24px',
    marginBottom: '0px',
  }),
);

export default themeStyles;
