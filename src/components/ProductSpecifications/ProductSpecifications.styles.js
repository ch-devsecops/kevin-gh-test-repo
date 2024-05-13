import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  css({
    display: 'grid',
    gridAutoRows: '1fr',
  }),
);

themeStyles.addBaseStyles('Row')(({ theme }) =>
  css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxHeight: ['95px', '95px', '45px'],
    px: ['25px', '15px'],
    py: ['default', 'default', 'xs'],
    backgroundColor: 'white',
    borderBottom: theme.borders[1],
    borderColor: 'grey.3',
    alignContent: 'center',
    '&:nth-child(even)': {
      backgroundColor: 'grey.5',
    },
  }),
);

themeStyles.addBaseStyles('Column')(
  css({
    letterSpacing: 'sm',
    fontSize: '14px',
    lineHeight: '24px',
    wordBreak: 'break-word',
    paddingRight: '18px',
  }),
);

export default themeStyles;
