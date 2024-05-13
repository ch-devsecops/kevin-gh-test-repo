import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('ExpandAllButton')(({ theme }) =>
  css({
    justifyContent: 'flex-end',
    pt: 's',
    pb: 's',
    borderTop: [theme.borders[1], 'none'],
    borderColor: 'grey.3',
  }),
);

themeStyles.addBaseStyles('SpecsSplide')(({ theme }) =>
  css({
    boxShadow: 'border-box',
    ...theme?.focused?.card(theme),
  }),
);

themeStyles.addBaseStyles('Wrapper')(
  css({
    position: 'relative',
    backgroundColor: 'white',
  }),
);

themeStyles.addBaseStyles('Content')(({ theme }) =>
  css({
    borderTop: `${theme.borders[1]} ${theme.colors.grey[3]}`,
    backgroundColor: 'transparent',
  }),
);

themeStyles.addBaseStyles('ContentRow')(
  css({
    backgroundColor: 'white',
    flexWrap: ['nowrap', 'nowrap', 'wrap'],
  }),
);

themeStyles.addBaseStyles('ContentColumn')(({ highlighted, theme }) =>
  css({
    px: 0,
    backgroundColor: highlighted && 'grey.5',
    borderTop: `${theme.borders[1]} ${theme.colors.grey[3]}`,
    height: ['100%', '100%', 'auto'],
  }),
);

themeStyles.addBaseStyles('ExpandAllCopy')(({ color }) =>
  css({
    color,
    fontFamily: 'bold',
  }),
);

themeStyles.addBaseStyles('ContentCopy')(({ isSingleColumn }) =>
  css({
    width: isSingleColumn && '188px',
    mx: isSingleColumn && 'auto',
    p: 'default',
    ':last-of-type': {
      pb: '-24px',
    },
    a: {
      color: 'black',
      textDecoration: 'none',
      fontFamily: 'bold',
    },
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    pl: 'default',
    py: 'default',
    fontFamily: 'bold',
    a: {
      color: 'typographyDefault',
      fontWeight: 'bold',
    },
  }),
);

themeStyles.addBaseStyles('LegalDisclaimer')(({ theme }) =>
  css({
    paddingY: 'l',
    paddingX: '20px',
    zIndex: 'accordionItemTitle',
    position: 'relative',
    borderTop: `${theme.borders[1]} ${theme.colors.grey[3]}`,
    backgroundColor: 'white',
    a: {
      color: 'typographyDefault',
      fontSize: 'sm',
    },
  }),
);

export default themeStyles;
