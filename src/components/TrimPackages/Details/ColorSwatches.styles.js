import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('ContentCopy')(({ isDark, hasColorsAccordion }) => {
  let color = isDark ? 'white' : ['white', 'white', 'black'];
  let textAlign = 'left';

  if (!hasColorsAccordion) {
    color = isDark ? 'white' : 'black';
    textAlign = ['center', 'center', 'left'];
  }

  return css({
    fontFamily: 'bold',
    color,
    textAlign,
    ml: ['m', 'm', 0],
  });
});

themeStyles.addBaseStyles('SwatchesContent')(({ isDark, colorSwatchAlignment }) =>
  css({
    fontFamily: 'bold',
    mt: ['m', 'm', 0],
    ml: ['m', 'm', 0],
    color: isDark ? 'white' : undefined,
    textAlign: colorSwatchAlignment,
  }),
);

themeStyles.addBaseStyles('Swatch')(() =>
  css({
    mr: [0, 0, 'xs'],
    ml: ['m', 'm', 0],
    mb: 's',
  }),
);

themeStyles.addBaseStyles('Row')(({ colorSwatchAlignment }) =>
  css({
    width: '100%',
    pt: 's',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: colorSwatchAlignment,
  }),
);

themeStyles.addBaseStyles('InteriorColorError')(({ isDark, isDesktop }) =>
  css({
    // eslint-disable-next-line no-nested-ternary
    color: isDark ? 'white' : isDesktop ? ['white', 'white', 'black'] : 'black',
  }),
);

export default themeStyles;
