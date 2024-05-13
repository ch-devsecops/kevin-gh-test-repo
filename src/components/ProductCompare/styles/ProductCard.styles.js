import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('ProductCardContainer')(
  ({ productCardPosition, productCardAlignment = 'space-between', productCardPseudoElement, isSticky }) =>
    css({
      p: 0,
      height: !isSticky && '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: productCardAlignment,
      alignItems: 'center',
      position: productCardPosition,
      '&::before': productCardPseudoElement,
    }),
);

themeStyles.addBaseStyles('PrimaryWrapper')(({ productIndex, primaryWrapperMaxHeight, primaryWrapperPseudoElement }) =>
  css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    margin: 'auto 0',
    maxHeight: primaryWrapperMaxHeight,
    '&::before': primaryWrapperPseudoElement(productIndex),
  }),
);

themeStyles.addBaseStyles('SecondaryWrapper')(
  css({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  }),
);

themeStyles.addBaseStyles('ProductPriceContainer')(({ isSticky }) =>
  css({
    flexGrow: isSticky ? 0 : 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),
);

themeStyles.addBaseStyles('CloseButton')(
  css({
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    '>div': {
      cursor: 'pointer',
    },
  }),
);

themeStyles.addBaseStyles('ProductImage')(({ isSticky }) =>
  css({
    maxWidth: '100%',
    maxHeight: isSticky ? '75px' : '150px',
    transition: 'height .3s',
    display: 'flex',
    justifyContent: 'center',
    '> img': {
      height: isSticky ? '75px' : '150px',
      transition: 'height .3s',
      width: 'auto',
    },
  }),
);

themeStyles.addBaseStyles('ImageContainerPsp')(({ isSticky }) =>
  css({
    transition: 'height .3s',
    display: 'flex',
    justifyContent: 'center',
    '> img': {
      height: isSticky ? ['43px', '43px', '64px'] : '132px',
      transition: 'height .3s',
      width: isSticky ? ['77px', '77px', '114px'] : '234px',
    },
  }),
);

themeStyles.addBaseStyles('Title')(({ hasPadding }) =>
  css({
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    height: '45px',
    paddingTop: hasPadding && 's',
  }),
);

themeStyles.addBaseStyles('CTA')(({ isSticky }) =>
  css({
    display: 'flex',
    mt: isSticky ? 'zero' : 'default',
    mb: isSticky ? ['s', 's', 'default'] : ['s', 's', 'xl'],
    justifyContent: 'center',
  }),
);

themeStyles.addBaseStyles('PriceButton')(
  css({
    minWidth: 'auto',
  }),
);

themeStyles.addBaseStyles('PriceButtonWrapper')(
  css({
    mt: 'l',
  }),
);

export default themeStyles;
