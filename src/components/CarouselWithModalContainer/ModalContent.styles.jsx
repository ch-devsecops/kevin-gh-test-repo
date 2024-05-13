import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('ModalWrapper')(
  css({
    '> button': {
      background: 'inherit',
    },
    '> button > div > svg': {
      width: ['13px', '25px'],
    },
  }),
);

themeStyles.addBaseStyles('CardContainer')(
  css({
    width: '100%',
    px: ['zero', 'zero', 'xl'],

    '> div': {
      pb: 'default',
    },
  }),
);

export default themeStyles;
