import css from '@styled-system/css';
import variant from '@styled-system/variant';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ contentAlignment }) => ({
  height: '100%',
  flexDirection: contentAlignment === 'right' && 'row-reverse',
  alignItems: ['top'],
}));

themeStyles.addBaseStyles('Media')(
  css({
    width: ['100%', '50%'],
  }),
);

themeStyles.addBaseStyles('MediaContainer')(({ inSideNav }) =>
  css({
    px: ['0', inSideNav ? '0' : 'columnGap.1'],
    height: ['150px', inSideNav ? 'auto' : '350px'],
    maxHeight: inSideNav && '255px',
    maxWidth: inSideNav && '453px',
    mt: ['default', 0],
    mb: ['xs', 0],
  }),
);

themeStyles.addBaseStyles('Content')(
  {
    display: 'flex',
    flexDirection: 'column',
  },

  css({
    justifyContent: ['initial', 'center'],
    width: ['100%', '50%'],

    '& >:last-child': {
      mb: 0,
    },
  }),

  variant({
    prop: 'contentAlignment',
    variants: {
      left: {
        pr: ['columnGap.0', '52px'],
        pl: ['columnGap.0', 'columnGap.1'],
      },
      right: {
        pr: ['columnGap.0', 'columnGap.1'],
        pl: ['columnGap.0', '52px'],
      },
    },
  }),
);

themeStyles.addBaseStyles('BodyTextContainer')(
  css({
    my: ['xs', 'm'],
    p: {
      mb: ['default'],
    },
    h6: {
      mb: ['4px'],
      color: ['blue'],
    },
  }),
);

themeStyles.addBaseStyles('CTAGroup')(
  css({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: ['column', 'row'],
    alignItems: 'center',
    alignContent: ['center', 'flex-start'],

    '& >:first-child': {
      mr: [0, 'm'],
    },

    '& > *': {
      mt: 'm',
    },
  }),
);

export default themeStyles;
