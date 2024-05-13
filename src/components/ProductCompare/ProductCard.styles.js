import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('ProductCardContainer')(
  css({
    p: 0,
  }),
);

themeStyles.addBaseStyles('CloseButton')(
  css({
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    '>div': {
      cursor: 'pointer',
    },
  }),
);

themeStyles.addBaseStyles('ProductImage')(({ isSticky }) =>
  css({
    maxWidth: '100%',
    maxHeight: isSticky ? '75px' : '150px',
    transition: 'height .3s',
    display: 'flex',
    justifyContent: 'center',
    '> img': {
      height: isSticky ? '75px' : '150px',
      transition: 'height .3s',
      width: 'auto',
    },
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
  }),
);

themeStyles.addBaseStyles('CTA')(
  css({
    display: 'flex',
    mt: 'default',
    mb: ['s', 's', 'xl'],
    justifyContent: 'center',
  }),
);

export default themeStyles;
