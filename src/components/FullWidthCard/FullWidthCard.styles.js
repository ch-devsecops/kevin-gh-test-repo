import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('ContentContainer')(
  css({
    mt: ['default', 'l'],
    px: ['20px', 'm'],
    textAlign: 'center',
  }),
);

themeStyles.addBaseStyles('ContentWrapper')(
  css({
    maxWidth: '824px',
    margin: '0 auto',
  }),
);

themeStyles.addBaseStyles('CTAGroup')(({ isTertiary }) => {
  const mobileDirection = isTertiary ? 'row' : 'column';
  const desktopTopMargin = isTertiary ? 'm' : 'l';
  const mobileTopMargin = isTertiary ? 'm' : 'default';

  const styles = {
    textAlign: 'center',
    display: 'inline-flex',
    flexDirection: [mobileDirection, 'row'],
    mt: [mobileTopMargin, desktopTopMargin],

    '& > *': {
      mx: 'xs',
    },
  };

  if (!isTertiary) {
    styles['& > *'] = {
      mx: 'xs',
      mb: ['m', 0],
    };

    styles['& > *:first-child, & > *:last-child'] = {
      mb: ['m', 0],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }

  return css(styles);
});

export default themeStyles;
