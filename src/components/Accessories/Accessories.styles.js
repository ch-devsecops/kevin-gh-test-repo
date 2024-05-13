import css from '@styled-system/css';
import variant from '@styled-system/variant';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Content')(({ isDark }) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bg: isDark ? '#000' : 'default',
  }),
);

themeStyles.addBaseStyles('CardContainer')(({ hasBottomDisclaimer }) =>
  css({
    width: '100%',
    pt: 'xl',
    justifyContent: 'center',
    pb: hasBottomDisclaimer ? 'zero' : 'big',
  }),
);

themeStyles.addBaseStyles('CardBottom')(
  css({
    my: 'xl',
    pl: ['zero', 'zero', 's'],
  }),
);

themeStyles.addBaseStyles('CardItem')(
  css({
    py: '12px',
  }),
);

themeStyles.addBaseStyles('TabContainer')(({ isDark }) =>
  css({
    pl: ['m', 'm', 'zero'],
    height: ['45px', '68px'],
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    bg: isDark ? 'black' : 'default',
  }),
);

themeStyles.addBaseStyles('TabItem')(
  css({
    pl: 'zero',
    pr: 'l',
    height: '100%',
  }),
);

themeStyles.addBaseStyles('Container')(({ isDark }) =>
  css({
    bg: isDark ? 'black' : undefined,
  }),
);

themeStyles.addBaseStyles('LoaderWrapper')(
  css({
    my: ['xxl', 'xxl', 'xbig'],
  }),
);

themeStyles.addBaseStyles('CardWrapper')(
  css({
    '::-webkit-scrollbar': {
      display: 'none' /* Chrome, Safari and Opera */,
    },
    '-ms-overflow-style': 'none' /* IE and Edge */,
    'scrollbar-width': 'none' /* Firefox */,
    /* overriding flexWrap styles from DSR (applicable only to Auto as shown with the utils showAccordion flag) */
    flexWrap: 'nowrap !important',
    py: 'default',
  }),
  variant({
    prop: 'type',
    variants: {
      accordion: {
        overflowX: 'scroll',
        px: 's',
      },
      slider: {
        flexDirection: 'row',
        overflowX: 'scroll',
      },
    },
  }),
);

themeStyles.addBaseStyles('ErrorWrapper')(
  css({
    display: 'flex',
    justifyContent: 'center',
    mt: ['xl', 'xl', 'xxl'],
    mb: ['xbig', 'xbig', 'xhuge'],
  }),
);

themeStyles.addBaseStyles('ErrorCopy')(
  css({
    size: 'regular',
    textAlign: 'center',
  }),
);

themeStyles.addBaseStyles('DisclaimerContainer')(
  css({
    my: 'xl',
    mt: ['default', 'default', 'xl'],
    mx: 'm',
  }),
);

themeStyles.addBaseStyles('DisclaimerCopy')(
  css({
    fontSize: '10px',
  }),
);

themeStyles.addBaseStyles('TabTitle')(({ theme, isDark, styles }) =>
  css({
    fontFamily: theme.fonts[styles?.tabTitleFontFamily],
    letterSpacing: '0.5px',
    bg: isDark ? 'black' : 'default',
    color: isDark ? 'white' : 'typographyDefault',
  }),
);

themeStyles.addBaseStyles('PriceCopy')(
  ({ isDark }) =>
    css({
      fontSize: '16px',
      lineHeight: '26px',
      color: isDark ? 'white' : 'black',
    }),
  variant({
    prop: 'type',
    variants: {
      slider: {
        mt: 'default',
      },
    },
  }),
);

themeStyles.addBaseStyles('AccordionTitle')(({ isDark }) =>
  css({
    color: isDark ? 'inherit' : 'white',
    pl: 5,
    fontWeight: 'bold',
  }),
);

themeStyles.addBaseStyles('DescriptionCopy')(({ isDark, descriptionCopyOverflowStyles }) =>
  css({
    color: isDark ? 'white' : 'typographyDefault',
    fontSize: '16px',
    lineHeight: 'md',
    fontFamily: 'default',
    ...descriptionCopyOverflowStyles,
  }),
);

themeStyles.addBaseStyles('AccessoryPartNumberCopy')(
  css({
    pb: 'default',
    fontSize: '16px',
    lineHeight: 'md',
  }),
);

themeStyles.addBaseStyles('OverlayContainer')(
  ({ backgroundColor }) =>
    css({
      backgroundColor,
      height: '100vh',
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }),
  variant({
    prop: 'type',
    variants: {
      desktop: {},
      mobile: {
        justifyContent: 'space-between',
        pt: 'xxl',
        pb: 'xl',
      },
    },
  }),
);

themeStyles.addBaseStyles('OverlayContent')(
  css({
    px: 'default',
  }),
);

themeStyles.addBaseStyles('OverlayImage')(
  css({
    mb: 'l',
  }),
);

themeStyles.addBaseStyles('OverlayTextGroup')(
  css({
    textAlign: 'center',
    width: '100%',
  }),
);

themeStyles.addBaseStyles('OverlayTextContent')(({ isDark }) =>
  css({
    height: '68px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDark ? 'black' : 'white',
    position: 'absolute',
    bottom: 0,
  }),
);

themeStyles.addBaseStyles('OverlayTextGroup')(
  css({
    textAlign: 'center',
    width: '100%',
  }),
);

themeStyles.addBaseStyles('OverlayTextGroupTitle')(({ isDark }) =>
  css({
    mb: 'm',
    textTransform: 'initial !important',
    color: isDark ? 'white' : undefined,
  }),
);

themeStyles.addBaseStyles('OverlayTextGroupDescription')(({ isDark }) =>
  css({
    pt: 'm',
    color: isDark ? 'white' : undefined,
  }),
);

themeStyles.addBaseStyles('OverlayTextGroupPrice')(({ isDark }) =>
  css({
    color: isDark ? 'white' : undefined,
  }),
);

themeStyles.addBaseStyles('OverlayTextContentTitle')(({ isDark }) =>
  css({
    fontFamily: 'bold',
    color: isDark ? 'white' : undefined,
  }),
);

themeStyles.addBaseStyles('ButtonOk')(
  css({
    mx: 'xl',
    mt: 'default',
  }),
);

themeStyles.addBaseStyles('DependencyContainer')(
  css({
    paddingTop: '10px',
  }),
);

themeStyles.addBaseStyles('DetailsContainer')(
  css({
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingY: ['xxl', 'big'],
    paddingX: ['default', 'big'],
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('DetailsImage')(
  css({
    maxWidth: '700px',
    height: 'auto',
    maxHeight: '400px',
  }),
);

themeStyles.addBaseStyles('DetailsTextGroup')(
  css({
    textAlign: 'center',
    width: '100%',
    pt: 'l',
  }),
);

themeStyles.addBaseStyles('DetailsTextTitle')(
  css({
    fontSize: ['28px', '28px', '44px'],
    fontFamily: 'default',
    lineHeight: ['32px', '32px', '50px'],
  }),
);

themeStyles.addBaseStyles('DetailsTextNumber')(
  css({
    fontFamily: 'default',
    fontSize: ['14px', '14px', '16px'],
    lineHeight: ['sm', 'sm', 'md'],
    letterSpacing: '0.5px',
    pt: 's',
  }),
);

themeStyles.addBaseStyles('DetailsTextPrice')(
  css({
    fontSize: ['16px', '16px', '18px'],
    fontFamily: 'bold',
    lineHeight: ['20px', '20px', 'sm'],
    pt: ['m', 'default'],
  }),
);

themeStyles.addBaseStyles('DetailsTextDescription')(
  css({
    fontFamily: 'default',
    fontSize: ['sm', 'sm', '16px'],
    lineHeight: ['16px', '16px', 'md'],
    letterSpacing: '0.5px',
    pt: ['m', 'l'],
    margin: 'auto',
    maxWidth: '800px',
  }),
);

export default themeStyles;
