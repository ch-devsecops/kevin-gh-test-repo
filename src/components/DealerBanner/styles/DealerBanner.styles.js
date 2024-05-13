import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ backgroundColor }) =>
  css({
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    backgroundColor,
    padding: '0px 80px 0px 70px',
  }),
);

themeStyles.addBaseStyles('StickyMedia')(({ theme }) =>
  css({
    position: 'sticky',
    top: [theme.header.mobile.height, theme.header.mobile.height, theme.header.desktop.height],
    zIndex: 1018,
  }),
);

themeStyles.addBaseStyles('AccordionTitleContainer')(
  css({
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('AccordionContentContainer')(
  css({
    marginLeft: '45px',
    padding: '0px 17px 6px 0px',
  }),
);

export default themeStyles;
