import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Wrapper')(({ marginBottom, marginTop, backgroundColor }) =>
  css({
    textAlign: 'center',
    marginX: 'auto',
    marginBottom: `${marginBottom}px`,
    marginTop: `${marginTop}px`,
    backgroundColor,
  }),
);

themeStyles.addBaseStyles('List')(({ columnCount }) =>
  css({
    columnCount: [1, 1, columnCount || 4],
    columnGap: 'm',
    margin: 'auto',
    width: 'fit-content',
  }),
);

export default themeStyles;
