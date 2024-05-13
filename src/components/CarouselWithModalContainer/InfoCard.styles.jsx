import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('InfoContainer')(
  css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
    maxWidth: [undefined, undefined, '400px'],
  }),
);

themeStyles.addBaseStyles('TextContainer')(
  css({
    p: ['default', 'l'],
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    flexGrow: 1,
  }),
);

themeStyles.addBaseStyles('Heading')(
  css({
    mb: 'm',
    flexGrow: 1,

    '> h6': {
      fontSize: '18px',
      lineHeight: 'sm',
    },
  }),
);

themeStyles.addBaseStyles('BodyText')(
  css({
    mb: ['default', 'l'],
    flexGrow: 1,

    '> div': {
      fontSize: 'md',
      lineHeight: 'md',
    },
  }),
);

export default themeStyles;
