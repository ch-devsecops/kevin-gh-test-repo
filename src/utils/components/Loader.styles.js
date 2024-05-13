import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';
import { variant } from '@styled-system/variant';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  css({
    display: 'flex',
  }),
  variant({
    prop: 'horizontalAlignment',
    variants: {
      left: {
        justifyContent: 'start',
      },
      center: {
        justifyContent: 'center',
      },
      right: {
        justifyContent: 'end',
      },
    },
  }),
);

themeStyles.addBaseStyles('AnimatedLoader')(
  css({
    width: '30px',
    height: '30px',
    mb: 'default',
    mt: 'm',
    fontWeight: 'bold',
  }),
);

export default themeStyles;
