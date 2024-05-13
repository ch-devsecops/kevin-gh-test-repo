import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Title')(
  css({
    fontFamily: 'bold',
    lineHeight: '26px',
    paddingTop: 'm',
    paddingBottom: 'xs',
  }),
);

themeStyles.addBaseStyles('PaymentDetailsRow')(
  css({
    marginTop: 'm',
    flexWrap: 'nowrap',
  }),
);

themeStyles.addBaseStyles('PaymentDetailsLabel')(
  css({
    textAlign: 'center',
    textTransform: 'capitalize',
  }),
);

themeStyles.addBaseStyles('PaymentDetailsContent')(
  css({
    textAlign: 'center',
    fontFamily: 'bold',
  }),
);

themeStyles.addBaseStyles('PaymentDetailsContainer')(
  css({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('ColumnWithDivider')(({ theme }) =>
  css({
    borderLeft: `${theme.borders[1]} ${theme.colors.grey[3]}`,
    borderRight: `${theme.borders[1]} ${theme.colors.grey[3]}`,
  }),
);

themeStyles.addBaseStyles('PaymentDetailsPaymentContainer')(
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('Tooltip')(
  css({
    ml: 'xxs',
  }),
);

export default themeStyles;
