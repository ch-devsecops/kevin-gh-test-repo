import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();
const justifyContent = {
  right: 'flex-end',
  center: 'center',
  left: 'flex-start',
};

themeStyles.addBaseStyles('Container')(({ contentAlignment }) =>
  css({
    display: 'flex',
    justifyContent: justifyContent[contentAlignment?.toLowerCase()],
    width: '100%',
    height: '100%',
  }),
);

export default themeStyles;
