import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('DropdownContainer')(({ showDropdownLabel }) =>
  css({
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    maxWidth: '380px',
    margin: '0 auto',
    pt: !showDropdownLabel ? ['l', 'l', 'm'] : '0',
    px: ['xl', 's'],
  }),
);

themeStyles.addBaseStyles('TransparentDropdown')(({ theme, showDropdownLabel }) =>
  css({
    mb: !showDropdownLabel && 'm',
    '>div': {
      background: theme.colors.white,
      // Add ellipsis to selected value
      '>span': {
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
    // Show full name in dropdown list
    '>ul': {
      '>li': {
        whiteSpace: 'normal',
        lineHeight: '24px',
      },
    },
  }),
);

themeStyles.addBaseStyles('DropdownLabel')(({ isDisabled }) =>
  css({
    fontFamily: 'bold',
    color: isDisabled ? 'grey.0' : 'black',
  }),
);

export default themeStyles;
