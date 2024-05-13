import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(({ theme }) =>
  css({
    display: 'flex',
    justifyContent: ['flex-start', 'space-between'],
    flexDirection: ['column', 'column', 'row'],
    paddingX: ['zero', 'zero', '80px'],
    pt: ['m', 'm', 0],
    minHeight: '70px',
    backgroundColor: 'white',
    borderBottom: `${theme.borders[1]} ${theme.colors.grey[2]}`,
    mb: ['-4px', '-4px', 'zero'],
  }),
);

themeStyles.addBaseStyles('ProgressContainer')(
  css({
    display: 'flex',
    gap: '10px',
    width: ['100%', '100%', 'auto'],
    alignSelf: ['auto', 'auto', 'flex-end'],
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: ['s', 's', 'zero'],
    paddingX: ['xs', 'xs', 'zero'],
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    fontFamily: 'bold',
    fontSize: '24px',
    lineHeight: '28px',
    alignSelf: 'center',
    marginBottom: ['s', 's', 0],
  }),
);

themeStyles.addBaseStyles('Item')(({ isActive, theme }) =>
  css({
    fontFamily: 'bold',
    minHeight: '44px',
    color: !isActive && 'grey.0',
    maxWidth: [undefined, '200px'],
    textTransform: 'capitalize',
    fontSize: ['12px', '12px', '14px'],
    lineHeight: ['18px', '18px', '24px'],
    paddingLeft: 'xs',
    paddingBottom: 's',
    textAlign: 'center',
    borderBottom: isActive && `${theme.borders[6]} ${theme.colors.red}`,
  }),
);

export default themeStyles;
