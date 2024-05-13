import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';
import variant from '@styled-system/variant';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ margins }) =>
  css({
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'top',
    px: ['default', 'zero'],
    mx: [
      margins?.horzMarginMob ? margins?.horzMarginMob : 'zero',
      margins?.horzMarginMob ? margins?.horzMarginMob : 'zero',
      margins?.cntnrHorizontalMargin ? margins?.cntnrHorizontalMargin : 'm',
    ],
  }),
);

themeStyles.addBaseStyles('CarouselWrapper')(({ margins }) =>
  css({
    width: '100%',
    pt: ['xl', 'xxl'],
    pb: ['m', 'm', 'xl'],
    mt: [
      margins?.topMarginMob ? margins?.topMarginMob : 'zero',
      margins?.topMarginMob ? margins?.topMarginMob : 'zero',
      margins?.containerTopMargin ? margins?.containerTopMargin : 'zero',
    ],
    mb: [
      margins?.bottomMarginMob ? margins?.bottomMarginMob : 'zero',
      margins?.bottomMarginMob ? margins?.bottomMarginMob : 'zero',
      margins?.containerBottomMargin ? margins?.containerBottomMargin : 'zero',
    ],
  }),
);

themeStyles.addBaseStyles('TitleHeader')(
  css({
    mb: ['default', '19px'],
    justifyContent: 'center',
  }),
);

themeStyles.addBaseStyles('CarouselContainer')(({ margins }) =>
  css({
    pt: ['56px', '59px'],
    mx: [
      margins?.horzMarginMob ? margins?.horzMarginMob : 'zero',
      margins?.horzMarginMob ? margins?.horzMarginMob : 'zero',
      margins?.cntnrHorizontalMargin ? margins?.cntnrHorizontalMargin : 'm',
    ],
  }),
);

themeStyles.addBaseStyles('Content')(
  {
    display: 'flex',
    flexDirection: 'column',
  },
  css({
    justifyContent: ['initial', 'center'],
    width: ['100%', '80%'],
    textAlign: 'center',

    '& >:last-child': {
      mb: 0,
    },
  }),

  variant({
    prop: 'contentAlignment',
    variants: {
      left: {
        pr: ['columnGap.0', 'xl'],
        pl: ['columnGap.0', 'columnGap.1'],
      },
      right: {
        pr: ['columnGap.0', 'columnGap.1'],
        pl: ['columnGap.0', 'xl'],
      },
    },
  }),
);

// TODO: Check why fontSize token <md> is not working
themeStyles.addBaseStyles('BodyText')(
  css({
    flexGrow: 1,
    lineHeight: 'md',
    fontSize: '16px',
  }),
);

themeStyles.addBaseStyles('StyledSplide')(({ theme, responsiveCardsPerPage }) =>
  css({
    display: responsiveCardsPerPage === 2 ? 'none' : 'flex',
    justifyContent: responsiveCardsPerPage === 1 && 'center',
    '&.is-next': {
      display: 'flex',
      justifyContent: responsiveCardsPerPage === 2 && 'flex-start',
    },
    '&.is-active': {
      display: 'flex',
      justifyContent: responsiveCardsPerPage === 2 && 'flex-end',
    },
    '&:focus': {
      border: 'transparent',
    },
    '&:focus-visible': {
      border: `solid 8px ${theme.colors.aodaFocused}`,
    },
  }),
);

export default themeStyles;
