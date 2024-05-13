import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Wrapper')(({ theme }) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space[5],
    mb: '50px',
  }),
);

themeStyles.addBaseStyles('TitleWrapper')(
  css({
    display: 'flex',
    flexDirection: ['row', 'row', 'column'],
    ml: ['s', 's', 'zero'],
  }),
);

themeStyles.addBaseStyles('ModalCardsGridTitle')(
  css({
    m: ['0 auto', '0 auto', 'zero'],
    pt: ['zero', 'zero', '19px'],
    pb: ['xs', 'xs', '50px'],
    fontWeight: '500',
  }),
);

themeStyles.addBaseStyles('TrimCardsGridTitle')(
  css({
    pl: ['57px', '57px', 0],
    pt: ['zero', 'zero', '19px'],
    pb: ['zero', 'zero', '50px'],
    fontWeight: '500',
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    textTransform: 'uppercase',
    fontSizes: '18px',
    px: ['20px', '20px', 0],
  }),
);

themeStyles.addBaseStyles('List')(({ theme }) =>
  css({
    display: 'grid',
    gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
    columnGap: theme.space.columnGapFull[0],
    rowGap: theme.space.columnGapFull[1],
  }),
);

themeStyles.addBaseStyles('StyledBaseCarousel')(({ theme, currentSlide, itemWidth }) => {
  const HALF_GAP = theme.space.s / 2;
  const NEGATIVE_MULTIPLIER = -1;
  const FIRST_SLIDE_PADDING = 20;

  const translateX = currentSlide
    ? (currentSlide * parseInt(itemWidth, 10) - HALF_GAP) * NEGATIVE_MULTIPLIER
    : FIRST_SLIDE_PADDING;

  return css({
    '& [aria-live="polite"]': {
      ...(itemWidth && {
        gap: 's',
        transform: `translateX(${translateX}px)`,
      }),
    },
    '& [aria-live="polite"] > div': {
      flex: itemWidth ? 1 : undefined,
      opacity: 1,
      visibility: 'visible',
      mt: 's',
      mb: theme.space.columnGapFull[1],
      display: 'flex',
      ...(!itemWidth && {
        display: 'flex',
        justifyContent: 'center',
      }),
    },
  });
});

themeStyles.addBaseStyles('StyledBasePaginator')(({ currentSlide, theme }) =>
  css({
    '&': {
      backgroundColor: theme.colors.white,
      boxShadow: '0 -2px 2px rgba(0,0,0,.1)',
      marginTop: 's',
    },
    '& button': {
      borderRadius: 0,
      backgroundColor: theme.colors.black,
    },
    '& svg path': {
      stroke: theme.colors.black,
    },
    [`& button:nth-child(${currentSlide + 1})`]: {
      backgroundColor: theme.colors.red,
    },
  }),
);

themeStyles.addBaseStyles('CardGridWrapper')(
  css({
    display: 'flex',
    flexDirection: 'column',
    mt: ['70px', '70px', 'auto'],
  }),
);

export default themeStyles;
