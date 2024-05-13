import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('DownloadCTA')(({ theme }) =>
  css({
    textDecoration: 'none',
    '&:focus-visible': {
      outline: `solid 4px ${theme.colors.aodaFocused}`,
    },
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    maxHeight: '26px',
  }),
);

themeStyles.addBaseStyles('Icon')(({ isDark }) =>
  css({
    width: '13px',
    color: isDark ? 'white' : 'black',
  }),
);

themeStyles.addBaseStyles('Copy')(({ isDark }) =>
  css({
    width: '13px',
    color: `${isDark ? 'white' : 'black'}`,
    fontFamily: 'bold',
    size: 'regular',
    ml: 's',
  }),
);

themeStyles.addBaseStyles('MobilePagination')(({ isDark }) =>
  css({
    backgroundColor: isDark ? 'black' : 'white',
    height: '64px',
    pb: 'l',
    width: '100%',
  }),
);

themeStyles.addBaseStyles('AccordionsSplide')(({ theme }) =>
  css({
    boxShadow: 'border-box',
    ...theme?.focused?.card(theme),
  }),
);

themeStyles.addBaseStyles('Wrapper')(({ isDark, isHidden }) =>
  css({
    backgroundColor: isDark ? 'black' : 'white',
    position: 'sticky',
    top: ['45px', '75px'],
    overflow: 'hidden',
    opacity: isHidden ? 0 : 1,
  }),
);

themeStyles.addBaseStyles('DownloadContainer')(
  css({
    width: [0, 'calc(100% / 6)'],
    display: ['none', 'block'],
    pt: '40px',
  }),
);

themeStyles.addBaseStyles('SliderContainer')(({ trimCount }) =>
  css({
    width: trimCount > 1 ? ['100%', 'calc(5/6 * 100%)'] : '100%',
    justifyContent: 'center',
    mt: trimCount > 1 ? '0' : [0, '-70px'],
    pl: 'zero',
  }),
);

export default themeStyles;
