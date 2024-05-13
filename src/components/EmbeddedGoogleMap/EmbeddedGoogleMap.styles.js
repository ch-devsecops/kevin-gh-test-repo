import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ theme }) =>
  css({
    '& .gm-style-cc button, & .gm-style-cc span, & .gm-style-cc a': {
      overflow: 'auto',
    },
    // original iframe styled moved to stylesheet
    '& iframe': {
      zIndex: '-1',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      border: 'none',
    },
    // resolves missing focus visible
    '& button, & a, & div[role=region]': {
      '&:focus': {
        border: 'transparent !important',
      },
      ...theme?.focused?.button(theme),
    },
  }),
);

export default themeStyles;
