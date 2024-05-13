import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';
import { MC_THEME_NAME } from '../../utils/constants';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

themeStyles.addBaseStyles('MediaContainer')(
  css({
    width: '100%',
    '> div > img': {
      maxHeight: ['initial', '345px'],
    },
  }),
);

themeStyles.addBaseStyles('TextContainer')(
  {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
  },
  ({ hasMargins, hasImage }) => {
    const styles = {
      py: hasImage ? ['20px', 'l'] : ['6px', '13px'],
    };

    if (hasMargins) {
      styles.px = ['20px', 'l'];
    } else {
      styles.paddingRight = ['20px', '40px'];
      styles.paddingLeft = ['20px', 0];
    }

    return css(styles);
  },
);

themeStyles.addBaseStyles('HeadingContainer')(({ isDark }) =>
  css({
    mb: 'm',
    '& a': {
      color: isDark ? 'white' : undefined,
    },
  }),
);

themeStyles.addBaseStyles('CTAGroup')(({ isTertiaryCTAGroup, contentAlignment }) => {
  const ctaStyles = {
    mt: 'm',
    mr: 'xs',
    textAlign: contentAlignment,
  };

  if (contentAlignment === 'center') {
    ctaStyles.ml = 'xs';
  }

  if (isTertiaryCTAGroup) {
    ctaStyles.display = 'inline-block';
  }

  return css({
    display: ['flex', 'initial'],
    justifyContent: contentAlignment,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: [isTertiaryCTAGroup ? 'row' : 'column', 'row'],

    '& > *': ctaStyles,
  });
});

themeStyles.addBaseStyles('BodyTextContainer')(({ isDark }) =>
  css({
    mb: ['xs', 'm'],
    flexGrow: 1,

    '&:last-child': {
      mb: '0px',
    },
    h6: {
      color: 'blue',
    },
    '& a': {
      color: isDark ? 'white' : undefined,
    },
  }),
);

themeStyles.addThemeStyles(
  'BodyTextContainer',
  MC_THEME_NAME,
)(
  css({
    h6: {
      color: ['black'],
    },
  }),
);
export default themeStyles;
