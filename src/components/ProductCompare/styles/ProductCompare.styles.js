import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('MainContainer')(
  css({
    mb: ['s', 's', 'xl'],
    display: 'flex',
    alignItems: 'center',
    flexDirection: ['column', 'column', 'row'],
    justifyContent: ['', '', 'space-between'],
    textAlign: 'center',
    padding: ['0 24px', '0 24px', '0'],
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    mt: '0',
  }),
);

themeStyles.addBaseStyles('ProductCompareRow')(({ theme }) =>
  css({
    borderBottom: theme.borders[1],
    borderColor: 'grey.3',
    flexDirection: 'row',
    flexWrap: ['nowrap', 'none'],
    paddingBottom: 0,
  }),
);

themeStyles.addBaseStyles('ProductCompareColumn')(({ isFullProductCards }) =>
  css({
    px: ['m', 'm', 'm'],
    border: 'none',
    display: !isFullProductCards && ['flex', 'flex', 'block'],
    flexDirection: !isFullProductCards && 'column',
  }),
);

themeStyles.addBaseStyles('ProductSelectorColumn')(
  css({
    px: ['m', 'm', 'm'],
    height: '100%',
    border: 'none',
  }),
);

themeStyles.addBaseStyles('SpecificationDescription')(
  css({
    fontFamily: 'default',
    fontSize: '14px',
    lineHeight: '24px',
    my: 's',
  }),
);

themeStyles.addBaseStyles('SpecificationTitle')(
  css({
    fontSize: '14px',
    lineHeight: '24px',
    fontFamily: 'bold',
    my: 's',
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    mb: 'xs',
    fontSize: ['36px', '36px', '68px'],
    lineHeight: ['40px', '40px', '74px'],
  }),
);

themeStyles.addBaseStyles('TableContainer')(({ theme }) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mx: '0',
    px: '0',
    marginTop: ['l', 'zero'],
    paddingBottom: ['l', '5vh', 'big'],
    borderTop: [theme.borders[1], theme.borders[1], 'none'],
    borderColor: ['grey.3', 'grey.3', undefined],
  }),
);

themeStyles.addBaseStyles('NoOptionsSelected')(
  css({
    font: 'default',
    fontSize: '16px',
  }),
);

themeStyles.addBaseStyles('Media')(({ stickyHeight }) =>
  css({
    top: ['45px', '45px', `calc(${stickyHeight} - 1px)`],
    position: 'sticky',
    zIndex: 210,
  }),
);

themeStyles.addBaseStyles('CarouselContainer')(({ showSticky, hideSticky }) =>
  css({
    maxWidth: '1280px',
    width: '100%',
    boxShadow: showSticky
      ? '0px 0px 0px rgba(0, 0, 0, 0.02),0px 0.7px 0px rgba(0, 0, 0, 0.028),0px 1.4px 0px rgba(0, 0, 0, 0.035),0px 2.9px 0px rgba(0, 0, 0, 0.047),0px 3px 0px rgba(0, 0, 0, 0.07)'
      : 0,
    background: 'white',
    left: [0, 'auto'],
    zIndex: hideSticky ? 1 : 210,
    transition: 'opacity .6s ease-in',
    '>div': {
      overflow: 'visible',
    },
  }),
);

themeStyles.addBaseStyles('Wrapper')(({ isIos }) =>
  css({
    pt: ['l', 'big'],
    px: ['0', '0', 'm'],
    overflowX: !isIos && 'clip',
  }),
);

export default themeStyles;
