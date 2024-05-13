import css from '@styled-system/css';

import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Wrapper')(({ backgroundColor = 'darkBlue' }) =>
  css({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor,
  }),
);

themeStyles.addBaseStyles('MediaContainer')(
  css({
    px: ['20px', 'zero'],
    py: ['20px', 'zero'],
  }),
);

themeStyles.addBaseStyles('ContentContainer')(
  css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    px: ['20px', '40px'],
    py: ['20px', 'xl'],
  }),
);

themeStyles.addBaseStyles('ContentWrapper')(
  css({
    width: '100%',
    flexGrow: '1',
  }),
);

themeStyles.addBaseStyles('CtaContainer')(
  css({
    width: '100%',
    display: ['flex', 'initial'],
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'column',
  }),
);

themeStyles.addBaseStyles('CtaWrapper')(({ isAppCta }) => {
  const styles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: isAppCta ? ['space-between', 'flex-start'] : ['center', 'flex-start'],
  };

  styles['& > *'] = {
    ml: ['zero', 'default'],
    mt: ['default'],
  };

  styles['& > *:first-child'] = {
    ml: 0,
  };

  if (isAppCta) {
    styles['a, a:hover'] = {
      borderBottom: 'none',
      outline: 'none',
    };
  }

  return css(styles);
});

export default themeStyles;
