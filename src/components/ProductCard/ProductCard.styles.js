import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('StyledCopy')(({ theme }) => {
  css({
    fontFamily: theme.fonts.default,
  });
});

themeStyles.addBaseStyles('Container')(() =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pt: 's',
    pb: ['s', 'l'],
  }),
);

themeStyles.addBaseStyles('Wrapper')(({ theme, maxWidth = ['246px', '295px'] }) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    fontFamily: theme.fonts.default,
    textAlign: 'center',
    maxWidth,
    p: ['xs', 'default'],
    mb: 0,
    '&:hover': {
      backgroundColor: ['none', 'grey.5'],
    },
  }),
);

themeStyles.addBaseStyles('SecondaryButton')(({ display = 'block' }) =>
  css({
    display,
    mt: 'default',
    mb: 's',
  }),
);

themeStyles.addBaseStyles('ToggleWrapper')(() =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: 's',
    position: 'relative',
    cursor: 'pointer',
    height: '20px',
  }),
);

themeStyles.addBaseStyles('CompareLabel')(({ disabled, compareLabelFontSize, compareLabelLineHeight }) =>
  css({
    fontFamily: 'bold',
    ml: 'xs',
    fontSize: compareLabelFontSize,
    lineHeight: compareLabelLineHeight,
    pointerEvents: 'none',
    color: disabled ? 'grey.0' : undefined,
  }),
);

themeStyles.addBaseStyles('CheckboxInput')(() =>
  css({
    height: 0,
    width: 0,
    opacity: 0,
    zIndex: -1,
  }),
);

themeStyles.addBaseStyles('CashSavings')(() =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  }),
);

export default themeStyles;
