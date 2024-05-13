import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Title')(() =>
  css({
    display: 'flex',
    paddingTop: 'm',
    mb: 'default',
  }),
);

themeStyles.addBaseStyles('Container')(() =>
  css({
    width: '340px',
  }),
);

themeStyles.addBaseStyles('Wrapper')(() =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
  }),
);

export default themeStyles;
