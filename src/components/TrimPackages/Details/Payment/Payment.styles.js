import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('TitleCopy')(({ isDark }) =>
  css({
    color: isDark ? 'white' : undefined,
    whiteSpace: 'nowrap',
    mr: 'xxs',
    fontWeight: 'regular',
    fontSize: ['10px', '10px', '10px'],
    '@media screen and (max-width: 1396px) {': {
      whiteSpace: 'break-spaces',
    },
  }),
);

themeStyles.addBaseStyles('PriceCopy')(({ isDark }) =>
  css({
    color: isDark ? 'white' : undefined,
    fontWeight: 'bold',
    fontFamily: 'bold',
    whiteSpace: 'nowrap',
    fontSize: ['16px', '16px', '16px'],
  }),
);

themeStyles.addBaseStyles('StyledCopy')(({ isDark, isNumber }) =>
  css({
    color: isDark ? 'white' : undefined,
    fontWeight: isNumber && 'bold',
    fontFamily: isNumber && 'bold',
    whiteSpace: 'nowrap',
    '@media screen and (max-width: 1396px) {': {
      whiteSpace: !isNumber && 'break-spaces',
    },
    // this is to avoid overlapping of the text when the viewport is in between theme breakpoints
    '@media screen and (max-width: 1239px) {': {
      fontSize: isNumber && '14px',
    },
  }),
);

themeStyles.addBaseStyles('PaymentWrapper')(() =>
  css({
    display: 'flex',
    justifyContent: ['center', 'center', 'flex-start'],
  }),
);

themeStyles.addBaseStyles('TermWrapper')(({ theme }) =>
  css({
    ml: 's',
    borderLeft: theme.borders[2],
    borderLeftColor: ['transparent', 'transparent', 'grey.3'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: ['center', 'center', 'normal'],
  }),
);

themeStyles.addBaseStyles('FrequencyWrapper')(() =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: ['center', 'center', 'normal'],
  }),
);

export default themeStyles;
