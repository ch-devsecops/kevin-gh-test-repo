import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('UniCardWrapper')(
  css({
    boxShadow: '0px 3px 6px 0px rgba(27, 27, 27, 0.23)',
  }),
);

themeStyles.addBaseStyles('ProductCardContainer')(({ backgroundColor }) =>
  css({
    backgroundColor: backgroundColor || 'white',
    borderRadius: '3px',
    padding: ['20px', '20px', 'default'],
    m: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: '16px',
    width: ['259px', '100%'],
    height: '100%',
  }),
);

themeStyles.addBaseStyles('TitleCopy')(({ alignment }) =>
  css({
    fontFamily: 'bold',
    fontSize: ['20px', '20px', '24px'],
    lineHeight: ['24px', '24px', '28px'],
    textAlign: alignment,
  }),
);

themeStyles.addBaseStyles('SubTitleCopy')(({ alignment, isBold }) =>
  css({
    fontFamily: isBold ? 'bold' : 'normal',
    fontSize: 'm',
    lineHeight: ['20px', '20px', '26px'],
    textAlign: alignment,
  }),
);

themeStyles.addBaseStyles('PriceDivider')(
  css({
    display: 'block',
    width: '100%',
    border: 0,
    height: '1px',
    backgroundColor: 'grey.2',
  }),
);

themeStyles.addBaseStyles('ImageNotFoundWrapper')(
  css({
    height: ['168px', '168px', '135px'],
    width: '100%',
    background: 'lightGray',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
);

themeStyles.addBaseStyles('ImageNotFoundCopy')(
  css({
    fontSize: ['l', 'l', 'xl'],
    lineHeight: 'default',
    fontFamily: 'bold',
    color: 'grey.0',
  }),
);

themeStyles.addBaseStyles('CardLink')(({ theme }) =>
  css({
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `8px solid ${theme.colors.someFocused}`,
    },
  }),
);

themeStyles.addBaseStyles('UniCardWrapper')(
  css({
    height: 'auto',
    borderRadius: '3px',
    boxShadow: '0px 3px 6px 0px rgba(27, 27, 27, 0.23)',
  }),
);

themeStyles.addBaseStyles('PaymentColumn')(
  css({
    paddingLeft: ['xxs', 'xxs'],
    paddingRight: ['xxs', 'xxs'],
  }),
);

themeStyles.addBaseStyles('PaymentAmountContainer')(
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('PaymentLabelCopy')(
  css({
    textAlign: 'center',
  }),
);

themeStyles.addBaseStyles('PaymentContentCopy')(({ fontSize, lineHeight }) =>
  css({
    textAlign: 'center',
    fontFamily: 'bold',
    fontSize,
    lineHeight,
  }),
);

export default themeStyles;
