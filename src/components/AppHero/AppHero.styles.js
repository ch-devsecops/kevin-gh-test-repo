import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';
import variant from '@styled-system/variant';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('ContentWrapper')(
  css({
    display: 'flex',
    flexDirection: 'column',
    height: ['85%', '85%', '100%'],
    position: ['absolute', 'absolute', 'relative'],
    top: ['20%', '25%', 0],
    left: [0, 0, 'unset'],
    mt: [6, 8, 'unset'],
  }),
  variant({
    prop: 'verticalAlignment',
    variants: {
      top: {
        justifyContent: ['space-evenly', 'space-evenly', 'flex-start'],
      },
    },
  }),
);

themeStyles.addBaseStyles('Content')(
  ({ horizontalAlignment }) =>
    css({
      textAlign: ['center', 'center', horizontalAlignment],
      display: 'inline-block',
      position: ['relative', 'relative', 'absolute'],
    }),
  variant({
    prop: 'horizontalAlignment',
    variants: {
      left: {
        left: 0,
      },
      right: {
        right: 0,
      },
      center: {
        margin: '0 auto',
        left: 0,
        right: 0,
      },
    },
  }),
  variant({
    prop: 'verticalAlignment',
    variants: {
      top: {
        top: 0,
      },
      bottom: {
        bottom: 0,
      },
    },
  }),
);

themeStyles.addBaseStyles('SubTitle')(
  css({
    maxWidth: ['370px', '400px', '500px'],
    lineHeight: ['22px', '22px', '26px'],
    margin: '8px auto',
    color: 'white',
    display: 'inline-block',
  }),
);

themeStyles.addBaseStyles('ButtonsWrapper')(({ horizontalAlignment }) => {
  let justifyContent = 'center';

  if (horizontalAlignment === 'left') {
    justifyContent = 'flex-start';
  }

  if (horizontalAlignment === 'right') {
    justifyContent = 'flex-end';
  }
  return css({
    display: 'flex',
    flexWrap: ['wrap', 'wrap', 'nowrap'],
    alignItems: 'center',
    maxWidth: ['100vw', '500px', 'unset'],
    justifyContent: ['center', 'center', justifyContent],
    margin: ['2px auto', '2px auto', '4px auto'],
    // workaround to keep responsive visibility div from
    // wrecking justify-content
    '> div.fresnel-container': {
      display: ['none', 'none', 'inline-block'],
    },
  });
});

themeStyles.addBaseStyles('BackgroundContainer')(({ mobileImageSource, desktopImageSource }) =>
  css({
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    background: [
      `url('${mobileImageSource}') center top / cover no-repeat`,
      `url('${mobileImageSource}') center top / cover no-repeat`,
      `url('${desktopImageSource}') center center / cover no-repeat`,
    ],
  }),
);

themeStyles.addBaseStyles('ImageLink')(
  css({
    marginTop: [2, 4, undefined],
    width: ['40%', '40%', 'unset'],
    '&:hover': {
      borderColor: 'transparent',
    },
    '> img': {
      maxWidth: '100%',
    },
  }),
);

export default themeStyles;
