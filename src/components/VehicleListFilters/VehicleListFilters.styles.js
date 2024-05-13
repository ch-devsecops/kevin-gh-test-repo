import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('MobileFiltersContainer')(
  css({
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    background: 'white',
  }),
);

themeStyles.addBaseStyles('FiltersWrapper')(
  css({
    pt: ['default', 'default', 'zero'],
    pr: ['20px', '20px', 'zero'],
    pl: ['20px', '20px', 'zero'],
  }),
);

themeStyles.addBaseStyles('HeaderWrapper')(
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 'm',
  }),
);

themeStyles.addBaseStyles('CloseButton')(
  css({
    border: 'none',
    bg: 'transparent',
    padding: 'zero',
    margin: 'zero',
  }),
);

themeStyles.addBaseStyles('CloseIcon')(
  css({
    cursor: 'pointer',
  }),
);

themeStyles.addBaseStyles('DesktopResetFiltersButton')(
  ({ theme }) =>
    css({
      display: 'flex',
      alignItems: 'center',
      background: 'transparent',
      outline: 'none',
      border: 'none',
      margin: 'zero',
      padding: 'zero',
      fontFamily: 'bold',
      color: theme?.colors?.black,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    }),
  ({ theme, disabled }) =>
    disabled &&
    css({
      color: theme?.colors?.grey[0],
      pointerEvents: 'none',
      textDecoration: 'none',
    }),
);

themeStyles.addBaseStyles('ButtonsContainer')(
  css({
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    bg: 'white',
  }),
);

themeStyles.addBaseStyles('ShadowBox')(
  css({
    display: 'flex',
    width: '100%',
    boxShadow: '6px -2px 6px 0px rgba(112, 112, 112, 0.10)',
  }),
);

themeStyles.addBaseStyles('ResetFiltersButton')(({ theme, disabled }) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'xs',
    minWidth: '50%',
    borderRadius: '0px',
    color: theme?.colors?.black,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    pointerEvents: disabled ? 'none' : 'auto',
    '>svg': {
      opacity: disabled ? '0.4' : '1',
    },
  }),
);

themeStyles.addBaseStyles('PrimaryButton')(
  css({
    pl: '20px',
    minWidth: '50%',
    borderRadius: '0px',
  }),
);

themeStyles.addBaseStyles('SectionWrapper')(
  css({
    mb: 'l',
  }),
);

themeStyles.addBaseStyles('SectionTitle')(({ theme }) =>
  css({
    fontFamily: 'bold',
    width: '100%',
    borderBottom: `${theme?.borders[1]} ${theme?.colors.grey[2]}`,
    pb: 'xs',
    mb: 's',
  }),
);

themeStyles.addBaseStyles('FilterItemsWrapper')(({ hasImages }) =>
  css(
    hasImages
      ? { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px 10px' }
      : { display: 'flex', flexWrap: 'wrap', gap: 's' },
  ),
);

themeStyles.addBaseStyles('ImageButton')(
  ({ theme }) =>
    css({
      background: 'transparent',
      cursor: 'pointer',
      outline: 'none',
      margin: 'zero',
      border: '1px solid transparent',
      padding: '17px 0 7px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '3px',
      '&:hover': {
        bg: ['transparent', 'transparent', theme?.colors?.grey[3]],
      },
      '&:focus-visible': {
        outline: `${theme?.borders[8]} ${theme?.colors.aodaFocused}`,
        outlineOffset: '-8px',
      },
    }),
  ({ theme, active }) =>
    active &&
    css({
      bg: theme.colors.extraLightBlue,
      borderColor: theme.colors.blue,
      '&:hover': {
        bg: theme.colors.extraLightBlue,
      },
    }),
  ({ disabled }) =>
    disabled &&
    css({
      opacity: '0.5',
      pointerEvents: 'none',
    }),
);

themeStyles.addBaseStyles('Image')(
  css({
    maxWidth: '100%',
    margin: '0 0 15px 0',
  }),
);

themeStyles.addBaseStyles('ImageLabel')(
  css({
    textAlign: 'center',
  }),
);

themeStyles.addBaseStyles('Label')(
  ({ theme }) =>
    css({
      background: 'transparent',
      cursor: 'pointer',
      outline: 'none',
      margin: 'zero',
      height: 'auto',
      px: ['10px', '10px', '26px'],
      py: '6px',
      borderRadius: '3px',
      border: `${theme.borders[1]} ${theme.colors.black}`,
      minWidth: '70px',
      color: `${theme.colors.black}`,
      whiteSpace: 'normal',
      textAlign: 'center',
      bg: 'white',
      '@media (hover: hover)': {
        '&:hover': {
          color: theme.colors.white,
          bg: theme.colors.darkBlue,
          borderColor: theme.colors.darkBlue,
        },
      },
      '&:focus-visible': {
        outline: `${theme.borders[8]} ${theme.colors.aodaFocused}`,
        outlineOffset: '-8px',
      },
    }),
  ({ theme, active }) =>
    active &&
    css({
      color: theme.colors.white,
      bg: theme.colors.blue,
      borderColor: theme.colors.blue,
    }),
  ({ theme, disabled }) =>
    disabled &&
    css({
      color: theme.colors.grey[0],
      bg: theme.colors.grey[3],
      borderColor: theme.colors.grey[3],
      '&:hover': {
        color: theme.colors.grey[0],
        bg: theme.colors.grey[3],
        borderColor: theme.colors.grey[3],
        pointerEvents: 'none',
      },
      '&hover > span': {
        pointerEvents: 'none',
      },
    }),
);

export default themeStyles;
