import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';
import { ACURA_SITE_NAME } from '../../../utils/constants';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('StyledColumn')(
  css({
    py: 'default',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  }),
  ({ appName, theme }) =>
    css({
      ':hover .select-trim-button': {
        backgroundColor: appName === ACURA_SITE_NAME ? 'black' : 'secondary',
        color: 'white',
        transition: 'color 0.3s ease, background-color 0.3s ease',
      },
      '&:focus-visible': {
        outline: `solid ${theme.colors.aodaFocused} 8px`,
      },
    }),
  ({ selected, appName }) =>
    selected &&
    css({
      '.select-trim-button': {
        backgroundColor: appName === ACURA_SITE_NAME ? 'black' : 'secondary',
        color: 'white',
        transition: 'color 0.3s ease, background-color 0.3s ease',
      },
    }),
);

themeStyles.addBaseStyles('StyledButton')(({ theme }) => ({
  [`@media screen and (max-width:${theme.breakpoints[1]})`]: {
    minWidth: '180px',
  },
}));

themeStyles.addBaseStyles('SliderContainer')(
  css({
    pt: 'default',
  }),
  ({ selected, appName }) =>
    selected &&
    css({
      '.select-trim-button': {
        backgroundColor: appName === ACURA_SITE_NAME ? 'black' : 'secondary',
        color: 'white',
      },
    }),
);

themeStyles.addBaseStyles('StyledIcon')(({ isExpanded, isDark, theme = {} }) => {
  const timing = theme.transitionTimingFunction.default;
  const duration = theme.transitionDuration.t4;
  const animationType = isExpanded ? 'rotatedown ' : 'rotateup';

  return css({
    width: '13px',
    height: '6px',
    color: isDark ? 'white' : 'black',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    animation: `${animationType} ${timing} ${duration}`,
  });
});

themeStyles.addBaseStyles('ListBox')(
  ({ theme }) => ({
    width: '100%',
    maxHeight: 0,
    transition: `all ${theme.transitionDuration.t4} ${theme.transitionTimingFunction.default}`,
    overflow: 'hidden',
    backgroundColor: theme.colors.white,
  }),
  ({ isOpen, height }) =>
    isOpen && {
      maxHeight: height,
      overflow: 'scroll',
    },
  ({ hasCompareProducts }) =>
    css({
      marginBottom: hasCompareProducts && ['l', 'zero', 'zero'],
    }),
);

themeStyles.addBaseStyles('GridWrapper')(
  css({
    py: 'xl',
    minHeight: ['auto', 'auto', '500px'],
  }),
);

themeStyles.addBaseStyles('GridTitle')(
  css({
    textAlign: 'center',
    mb: 'l',
    textTransform: 'none',
  }),
);

themeStyles.addBaseStyles('CompareButtonWrapper')(
  css({
    textAlign: 'center',
    mb: 'default',
  }),
);

themeStyles.addBaseStyles('GridContent')(
  css({
    justifyContent: 'center',
    height: '100%',
    bg: 'white',
  }),
);

themeStyles.addBaseStyles('LegalText')(
  css({
    py: 'xl',
  }),
);

themeStyles.addBaseStyles('SliderWrapper')(
  css({
    height: '100%',
    overflow: 'scroll',
  }),
);

themeStyles.addBaseStyles('SliderContent')(
  css({
    textAlign: 'center',
    mb: 'default',
    px: 'default',
  }),
);

themeStyles.addBaseStyles('SliderLegalText')(
  css({
    px: '20px',
    mt: 'm',
  }),
);

themeStyles.addBaseStyles('SliderCTAPlaceholder')(
  css({
    height: '45px',
  }),
);

themeStyles.addBaseStyles('ToggleTitleContent')(
  css({
    height: ['auto', 'auto', '27px'],
    width: ['175px', '175px', '100%'],
  }),
);

themeStyles.addBaseStyles('PriceContainer')(
  css({
    display: 'flex',
    flexDirection: ['column', 'row'],
  }),
);

themeStyles.addBaseStyles('TogglePriceContainer')(
  css({
    textAlign: 'right',
  }),
);

themeStyles.addBaseStyles('ToggleContainer')(({ isDark }) =>
  css({
    width: '100%',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    bg: isDark ? 'black' : 'white',
  }),
);

themeStyles.addBaseStyles('ToggleWrapperBox')(({ mobileWrapperHeight }) =>
  css({
    height: [mobileWrapperHeight, mobileWrapperHeight, '75px'],
    py: 's',
  }),
);

themeStyles.addBaseStyles('ToggleContent')(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: ['space-between'],
    width: '100%',
    height: ['auto', 'auto', '100%'],
    pl: ['xs', 'xs', 'default'],
    pr: ['xs', 'xs', 'xl'],
  }),
);

themeStyles.addBaseStyles('ToggleButton')(({ isDark }) =>
  css({
    height: ['auto', 'auto', '100%'],
    border: 'none',
    backgroundColor: isDark ? 'black' : 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    px: 'zero',
  }),
);

themeStyles.addBaseStyles('ToggleLabel')(({ isDark }) =>
  css({
    fontFamily: 'bold',
    size: 'nav',
    mr: 's',
    color: isDark ? 'white' : undefined,
  }),
);

export default themeStyles;
