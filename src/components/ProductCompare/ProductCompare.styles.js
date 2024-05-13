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

themeStyles.addBaseStyles('ProductCompareColumn')(
  css({
    border: ['1px solid', '1px solid', 0],
    borderColor: ['grey.3', 'grey.3'],
    px: [0, 0, 'm'],
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

themeStyles.addBaseStyles('TableContainer')(
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mx: '0',
    px: '0',
    marginTop: ['l', 'zero'],
  }),
);

themeStyles.addBaseStyles('NoOptionsSelected')(
  css({
    font: 'default',
    fontSize: '16px',
  }),
);

themeStyles.addBaseStyles('Media')(
  css({
    top: ['l', 'l', '72px'],
    position: 'sticky',
    zIndex: 1,
    overflowX: 'clip',
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
    '> .splide': {
      '> .splide__track': {
        overflow: 'unset',
        overflowY: 'visible',
      },
    },
  }),
);

themeStyles.addBaseStyles('Wrapper')(
  css({
    pt: ['l', 'big'],
    px: ['0', '0', 'm'],
  }),
);

export default themeStyles;
