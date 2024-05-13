import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('MobileContainer')({
  width: '100%',
  height: '100%',
});

themeStyles.addBaseStyles('ImageContainer')({
  position: 'relative',
  width: 'inherit',
  height: 'inherit',
});

export default themeStyles;
