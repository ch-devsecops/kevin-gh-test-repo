import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('CellWrapper')(
  css({
    display: 'flex',
    flexDirection: ['column', 'column', 'row'],
  }),
);

themeStyles.addBaseStyles('StyledMarkdown')(
  css({
    fontFamily: 'bold',
    color: 'red',
    textAlign: 'center',
  }),
);

export default themeStyles;
