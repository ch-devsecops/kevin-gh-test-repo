import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Wrapper')(({ hasIcon }) => {
  const styles = {
    width: '100%',
    height: '100%',
    position: 'relative',
  };

  if (hasIcon) {
    styles.pt = ['17.5px', '22.5px'];
  }

  return css(styles);
});

themeStyles.addBaseStyles('Container')(({ hasIcon, hasCTA }) => {
  const styles = {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  if (!hasIcon) {
    styles.pt = ['l', '40px'];
    styles.pb = ['l', '40px'];
  } else {
    styles.pt = hasCTA ? ['40px', '55px'] : ['42px', '40px'];
    styles.pb = ['l', 'l'];
  }

  return css(styles);
});

themeStyles.addBaseStyles('Title')(
  css({
    textAlign: 'center',
    mx: 'm',
  }),
);

themeStyles.addBaseStyles('IconContainer')(
  css({
    size: ['35px', '45px'],
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
  }),
);

themeStyles.addBaseStyles('CTAGroup')(
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& > *': {
      mb: 'm',
    },

    '& > *:last-child': {
      mb: '0',
    },

    '& a': {
      color: 'red',
    },
  }),
);

themeStyles.addBaseStyles('Divider')(
  css({
    maxWidth: ['164px', '182px'],
    width: '100%',
    height: '1px',
    bg: 'primary',
    mx: 'auto',
    my: 'default',
  }),
);

themeStyles.addBaseStyles('BodyTextContainer')(({ hasCTA }) =>
  css({
    px: ['default', '14.25%'],
    mb: hasCTA ? ['m', 'default'] : [0, 0],
  }),
);

export default themeStyles;
