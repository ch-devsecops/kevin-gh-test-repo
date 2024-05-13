import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  css({
    width: '100%',
    alignItems: ['top'],
    textAlign: ['center', 'center', 'left'],
    pt: ['zero', 's', 'xxl'],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
);

themeStyles.addBaseStyles('Media')(
  css({
    width: ['100%', '100%', '50%'],
    img: {
      height: 'auto',
      maxWidth: '100%',
      width: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
    },
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    fontSize: ['24px !important', '44px'],
  }),
);

themeStyles.addBaseStyles('Content')(
  css({
    width: ['100%', '100%', '48%'],
  }),
);

themeStyles.addBaseStyles('MediaContainer')(
  css({
    width: ['100%', '100%', 'auto'],
    px: [0, 0, 'columnGap.1'],
    height: ['auto'],
    maxWidth: '100%',
    mt: 'm',
    mb: ['m', 'm', 'zero'],
    mx: [0, 0, 'auto'],
  }),
);

themeStyles.addBaseStyles('BodyText')(
  css({
    my: ['xs', 'xs', 'default'],
    textAlign: 'left',
    p: {
      mb: ['default'],
    },
  }),
);

export default themeStyles;
