import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Wrapper')(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),
);

themeStyles.addBaseStyles('StyledH4')(
  css({
    fontSize: ['24px', '24px', '32px'],
    height: ['28px', '28px', '60px'],
    lineHeight: ['28px', '28px', '68px'],
    mb: ['default', 'default', 's'],
  }),
);

themeStyles.addBaseStyles('Container')(
  css({
    display: 'flex',
    alignItems: ['flex-start', 'flex-start', 'flex-end'],
    flexDirection: ['column-reverse', 'column-reverse', 'row'],
  }),
);

themeStyles.addBaseStyles('LeftColumn')(
  css({
    display: 'flex',
    flexDirection: 'column',
    width: ['280px', '280px', '563px'],
    mr: ['0', '0', 'l'],
    mt: ['m', 'm', '0'],
  }),
);
themeStyles.addBaseStyles('AddressWrapper')(
  css({
    height: ['317px', '317px', '364px'],
    fontSize: ['14px', '14px', '16px'],
  }),
);

themeStyles.addBaseStyles('StyledCopy')(
  css({
    fontFamily: 'default',
    lineHeight: ['sm', 'sm', 'md'],
    color: 'black',
    // NOTE: safari injects anchor for phone number, and below is to reset default styles
    '>a': {
      fontFamily: 'default',
      lineHeight: ['sm', 'sm', 'md'],
      textDecoration: 'none',
      color: 'black',
    },
  }),
);
export default themeStyles;
