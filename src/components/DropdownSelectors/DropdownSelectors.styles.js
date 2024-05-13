import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Description')(
  css({
    textAlign: 'center',
    letterSpacing: '0.5px',
    lineHeight: ['sm', 'sm', 'md'],
    mb: 'default',
  }),
);

themeStyles.addBaseStyles('DropdownWrapper')(
  css({
    display: 'flex',
    flexDirection: ['column', 'row'],
    mb: ['zero', 'm'],
    width: ['100%', 'auto'],
    '& > *:only-child': {
      mr: 'zero',
    },
    '& > *:not(only-child)': {
      mr: ['zero', 'default'],
    },
    '& > *:last-child': {
      mr: 'zero',
    },
  }),
);

themeStyles.addBaseStyles('BodyText')(
  css({
    color: 'black',
    width: '100%',
    maxWidth: '824px',
    marginBottom: ['default', 'l'],
    textAlign: 'center',
    lineHeight: ['22px', '26px'],
  }),
  ({ color }) =>
    css({
      color,
    }),
);

themeStyles.addBaseStyles('BottomDisclaimerText')(
  ({ disclaimerMargins }) =>
    css({
      color: 'black',
      width: '100%',
      maxWidth: disclaimerMargins ? '1280px' : '1000px',
      px: disclaimerMargins ? '16px' : 'none',
      pt: !disclaimerMargins && ['default', 'l'],
      my: disclaimerMargins && disclaimerMargins,
      textAlign: disclaimerMargins ? 'left' : 'center',
      lineHeight: disclaimerMargins ? '14px' : '22px',
      fontSize: disclaimerMargins ? '10px' : '12px',
    }),
  ({ color }) =>
    css({
      color,
    }),
);

export default themeStyles;
