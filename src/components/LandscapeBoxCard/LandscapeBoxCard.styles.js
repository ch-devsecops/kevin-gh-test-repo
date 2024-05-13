import css from '@styled-system/css';
import variant from '@styled-system/variant';
import color from '@styled-system/color';

import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('MediaContainer')(({ contentAlignment }) => {
  const baseAttrs = {
    position: 'absolute',
    maxWidth: ['848px'],
    width: ['100%', '67%'],
    height: ['260px', '477px'],
    top: 0,
  };

  if (contentAlignment === 'right') {
    baseAttrs.left = 0;
  } else {
    baseAttrs.right = 0;
  }

  return css(baseAttrs);
});

themeStyles.addBaseStyles('Container')(({ contentAlignment }) => {
  const desktopFlexDirection = contentAlignment === 'right' ? 'row-reverse' : 'row';

  return css({
    display: 'flex',
    position: 'relative',
    minHeight: ['260px', '477px'],
    flexDirection: ['column', desktopFlexDirection],
    justifyContent: ['center', 'flex-start'],
    '&:after': {
      content: '""',
      minHeight: [0, 'inherit'],
    },
  });
});

themeStyles.addBaseStyles('ContentBox')(
  css({
    backgroundColor: 'white',
    height: ['315px', '408px'],
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: '1',
    '& > *': {
      alignSelf: 'center',
    },
    marginTop: ['228px', 0],
    width: ['calc(100% - 20px)', '350px', '466px'],
  }),
  color,
  variant({
    prop: 'styling',
    variants: {
      nsx: {
        position: 'absolute',
        right: '0',
        bottom: '0',
        paddingLeft: ['0', '85px'],
        marginRight: ['0', '12px'],
        width: ['100%', '530px'],
        height: ['315px', '100%'],
        background: ['transparent', 'linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)'],
      },
    },
  }),
);

themeStyles.addBaseStyles('CTAGroup')(({ isTertiary }) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: isTertiary ? ['m', 'l'] : 'default',
    '& > *': {
      mb: isTertiary ? ['m', 'l'] : 'm',
    },
    '& >:last-child': {
      mb: 0,
    },
  }),
);

export default themeStyles;
