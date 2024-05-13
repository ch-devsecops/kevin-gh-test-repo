import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ theme }) =>
  css({
    backgroundColor: 'grey.5',
    border: `${theme.borders[1]} ${theme.colors.grey[2]}`,
    display: 'flex',
    alignItems: ['flex-start', 'flex-start', 'center'],
    flexDirection: ['column', 'column', 'row'],
    justifyContent: ['flex-start', 'flex-start', 'space-between'],
    borderRadius: '4px',
    py: 'm',
    px: 'm',
    mt: 0,
    mx: ['m', 'm', 'big'],
    mb: ['xs', 'xs', 'm'],
    ':last-child': {
      mb: ['default', 'default', 'l'],
    },
  }),
);

themeStyles.addBaseStyles('Header')(
  css({
    mb: 'xs',
  }),
);

themeStyles.addBaseStyles('CopyContainer')(
  css({
    width: ['90%', '90%', '75%'],
  }),
);

themeStyles.addBaseStyles('PriceComponentWrapper')(({ hasDiscount }) => {
  const height = hasDiscount ? '92px' : '40px';
  return css({
    width: 'max-content',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    mb: ['default', 'default', 0],
    mt: ['m', 'm', 0],
    '> div': {
      height: [height, height, undefined],
      flexDirection: 'column',
    },
  });
});

export const priceComponentStyles = {
  pricesContainer: {
    pb: 0,
  },
  priceStyles: {
    copy: {
      styles: {
        fontSize: ['24px', '24px', '24px'],
        lineHeight: ['28px', '28px', '28px'],
      },
    },
    discount: {
      styles: {
        fontSize: ['16px', '16px', '16px'],
      },
    },
  },
  saveStyles: {
    container: {
      mx: 0,
    },
    copy: {
      styles: {
        fontSize: ['14px'],
      },
    },
  },
};

export default themeStyles;
