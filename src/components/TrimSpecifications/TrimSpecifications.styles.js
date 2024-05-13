import css from '@styled-system/css';
import { ThemeStyles, Copy } from '@honda-canada/design-system-react';
import styled from 'styled-components';

const themeStyles = new ThemeStyles();

export const LegalDisclaimer = styled(Copy)(({ isDark, theme }) =>
  css({
    paddingY: 'l',
    paddingX: '20px',
    zIndex: 'accordionItemTitle',
    position: 'relative',
    borderTop: `${theme.borders[1]} ${theme.colors.grey[3]}`,
    backgroundColor: isDark ? 'black' : 'white',
    a: {
      color: isDark ? 'white' : 'typographyDefault',
      fontSize: 'sm',
    },
  }),
);

themeStyles.addBaseStyles('AccordionsBox')(({ theme }) =>
  css({
    p: 'default',
    borderTop: `${theme.borders[1]} ${theme.colors.grey[3]}`,
    ':last-of-type': {
      pb: '-24px',
    },
  }),
);

themeStyles.addBaseStyles('AccordionsSplide')(({ theme }) =>
  css({
    boxShadow: 'border-box',
    ...theme?.focused?.card(theme),
  }),
);

themeStyles.addBaseStyles('AccordionsWrapper')(({ isDark }) =>
  css({
    position: 'relative',
    backgroundColor: isDark ? 'black' : 'white',
  }),
);

themeStyles.addBaseStyles('AccordionsContent')(({ isDark, theme }) =>
  css({
    borderTop: `${theme.borders[1]} ${theme.colors.grey[3]}`,
    backgroundColor: isDark ? 'black' : 'transparent',
  }),
);

themeStyles.addBaseStyles('AccordionsContentRow')(({ isDark }) =>
  css({
    backgroundColor: isDark ? 'black' : 'white',
  }),
);

themeStyles.addBaseStyles('AccordionsContentColumn')(
  css({
    px: ['0', '0', '0'],
  }),
);

themeStyles.addBaseStyles('AccordionsContentBox')(({ isDark, selected }) =>
  css({
    backgroundColor: selected && (isDark ? 'black' : 'grey.5'),
  }),
);

themeStyles.addBaseStyles('ExpandAllCopy')(({ color }) =>
  css({
    color,
    fontFamily: 'bold',
  }),
);

export const AccordionsCopy = styled(Copy)(({ isDark, isSingleColumn }) =>
  css({
    width: isSingleColumn && '188px',
    mx: isSingleColumn && 'auto',
    a: {
      color: isDark ? 'white' : 'black',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  }),
);

export const AccordionsItemTitle = styled(Copy)(({ isDark }) =>
  css({
    pl: 'default',
    py: 'default',
    fontFamily: 'bold',
    a: {
      color: isDark ? 'white' : 'typographyDefault',
      fontWeight: 'bold',
    },
  }),
);

export const AccordionsDisclaimersCopy = styled(Copy)(({ isDark }) =>
  css({
    pl: 'default',
    py: 'default',
    a: {
      color: isDark ? 'white' : 'black',
      fontWeight: 'bold',
    },
  }),
);

themeStyles.addBaseStyles('TrimCardsSliderDownloadCTA')(({ theme }) =>
  css({
    display: 'flex',
    maxHeight: '26px',
    textDecoration: 'none',
    ...theme?.focused?.textLink(theme),
  }),
);

export const TrimCardsSliderDownloadCTALabel = styled(Copy)(({ isDark }) =>
  css({
    ml: 's',
    a: {
      color: isDark ? 'white' : 'typographyDefault',
      fontWeight: 'bold',
    },
  }),
);

themeStyles.addBaseStyles('DownloadColumn')(
  css({
    pt: '40px',
    pr: 'zero',
    pl: 's',
    width: 'calc(100% / 6)',
  }),
);

themeStyles.addBaseStyles('DesktopSliderRow')(({ isDark }) =>
  css({
    backgroundColor: isDark ? 'black' : 'white',
  }),
);

themeStyles.addBaseStyles('TrimTitleColumn')(
  css({
    width: 'calc(500% / 6)',
    pl: '0px !important',
    justifyContent: 'center',
  }),
);

themeStyles.addBaseStyles('DesktopSliderHeaderWrapper')(({ isDark }) =>
  css({
    position: 'fixed',
    top: '70px',
    zIndex: 'modal',
    gutters: [false, false],
    backgroundColor: isDark ? 'black' : 'transparent',
  }),
);

const selectedTrimBg = isDark => (isDark ? 'black' : 'grey.5');
const nonSelectedTrimBg = isDark => (isDark ? 'black' : 'white');

themeStyles.addBaseStyles('SplideSlideContent')(({ isDark, isSelectedTrim, isPaginationSticky }) =>
  css({
    width: '100%',
    border: 'none',
    pt: '40px',
    pb: isPaginationSticky ? '22px' : 'zero',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: isSelectedTrim ? selectedTrimBg(isDark) : nonSelectedTrimBg(isDark),
  }),
);

themeStyles.addBaseStyles('SplideSlideBadge')(
  css({
    height: '24px',
    py: 'xxs',
  }),
);

export const SplideSlideBadgeLabel = styled(Copy)(({ isDark }) =>
  css({
    a: {
      textAlign: 'center',
      color: isDark ? 'white' : 'typographyDefault',
      fontWeight: 'bold',
    },
    '& span': {
      fontFamily: 'bold',
    },
  }),
);

themeStyles.addBaseStyles('DesktopPaginationWrapper')(({ pagination }) =>
  css({
    pt: 'm',
    display: 'flex',
    mx: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '48px',
    ...pagination,
  }),
);

export default themeStyles;
