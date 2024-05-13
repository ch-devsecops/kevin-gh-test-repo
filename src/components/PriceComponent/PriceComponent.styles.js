import styled from 'styled-components';
import css from '@styled-system/css';
import { ThemeStyles, Copy } from '@honda-canada/design-system-react';
import { variant } from '@styled-system/variant';

const themeStyles = new ThemeStyles();

/** height of the container which wraps the error label/selling price
    label and the price
*/
const containerHeight = '46px';

themeStyles.addBaseStyles('PriceContainer')(
  () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: containerHeight,
    }),
  variant({
    prop: 'horizontalAlignment',
    variants: {
      left: {
        alignItems: 'start',
      },
      center: {
        alignItems: 'center',
      },
      right: {
        alignItems: 'end',
      },
    },
  }),
);

themeStyles.addBaseStyles('PricesContainer')(
  ({ gap }) =>
    css({
      display: 'flex',
      gap,
    }),
  variant({
    prop: 'horizontalAlignment',
    variants: {
      left: {
        justifyContent: 'flex-start',
      },
      right: {
        justifyContent: 'flex-end',
      },
      center: {
        justifyContent: 'center',
      },
    },
  }),
);

themeStyles.addBaseStyles('PriceToolTipContainer')(() =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('SaveContainer')(() =>
  css({
    width: 'fit-content',
    paddingY: '6px',
    paddingX: 's',
    mb: 's',
    borderRadius: '2px',
    gap: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  }),
);

themeStyles.addBaseStyles('StyledTooltip')(() =>
  css({
    alignSelf: 'flex-start',
    ml: 'xxs',
  }),
);

themeStyles.addBaseStyles('ErrorIcon')(() =>
  css({
    mr: 'xxs',
  }),
);

export const TooltipLabel = styled(Copy)(({ theme, styles, isDark, defaultColor }) =>
  css({
    fontFamily: theme.fonts.default,
    color: isDark ? 'white' : defaultColor,
    ...styles,
  }),
);
export const PriceCopy = styled(Copy)(
  ({ styles, isDark }) => css({ ...styles, color: isDark ? 'white' : undefined }),
  ({ hasDiscount }) => hasDiscount && css({ color: 'red' }),
);
export const PriceDiscountCopy = styled(Copy)(({ styles }) =>
  css({ ...styles, ml: 'xxs', textDecoration: 'line-through' }),
);
export const ErrorCopy = styled(Copy)(({ styles }) => css(styles));
export const SaveCopy = styled(Copy)(({ theme, styles }) =>
  css({ ...styles, color: 'white', fontFamily: theme.fonts.bold }),
);

export const priceComponentDefaultStyles = {
  pricesContainer: {
    gap: 'm',
  },
  priceStyles: {
    container: {
      pb: '0',
      alignItems: 'center',
    },
    title: { size: 'small', styles: {}, color: 'typographyDefault' },
    copy: { size: 'subheading', styles: {} },
    discount: { size: 'extraSmall', styles: {} },
  },
  saveStyles: {
    container: {},
    copy: { size: 'extraSmall', styles: {} },
  },
  errorStyles: {
    container: {
      px: '0',
      alignItems: 'center',
    },
    copy: { size: 'extraSmall', styles: {} },
  },
};

themeStyles.addBaseStyles('Container')(
  () =>
    css({
      display: 'flex',
      height: containerHeight,
      alignItems: 'baseline',
    }),
  variant({
    prop: 'horizontalAlignment',
    variants: {
      left: {
        justifyContent: 'start',
      },
      center: {
        justifyContent: 'center',
      },
      right: {
        justifyContent: 'end',
      },
    },
  }),
  variant({
    prop: 'verticalAlignment',
    variants: {
      center: {
        alignItems: 'center',
      },
      start: {
        alignItems: 'start',
      },
      end: {
        alignItems: 'end',
      },
    },
  }),
);

export default themeStyles;
