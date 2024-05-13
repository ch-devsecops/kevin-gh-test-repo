import css from '@styled-system/css';
import variant from '@styled-system/variant';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  ({ mt }) =>
    css({
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      textAlign: 'left',
      flexDirection: 'row-reverse',
      width: 'fit-content',
      mt: mt || 's',
      marginX: 'm',
      '&:first-child': {
        mt: 0,
      },
    }),
  variant({
    prop: 'iconPosition',
    variants: {
      above: {
        gap: ['none', 'xs'],
        width: ['fit-content', 'auto'],
        alignItems: ['flex-start', 'center'],
        flexDirection: ['row-reverse', 'column-reverse'],
      },
    },
  }),
);

themeStyles.addBaseStyles('SecondaryButton')(
  css({
    display: ['none', 'block'],
    mt: 'default',
    mb: 's',
  }),
);

themeStyles.addBaseStyles('IconContainer')(
  css({
    display: 'block',
    position: 'relative',
    height: '20px',
    width: '20px',
    minWidth: '20px',
    marginTop: '3px',
  }),
);

themeStyles.addBaseStyles('IconLabel')(
  css({
    ml: 'm',
    fontSize: '16px',
    lineHeight: ['md', 'md', 'md'],
    letterSpacing: 'sm',
    pointerEvents: 'none',
  }),
);

export default themeStyles;
