import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('ImageNotFoundWrapper')(({ accessoryModal }) =>
  css({
    height: ['210px', '210px', '300px'],
    width: accessoryModal ? '700px' : 'auto',
    background: 'lightgray',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
);

themeStyles.addBaseStyles('ImageNotFoundCopy')(() =>
  css({
    fontSize: '14px',
    lineHeight: '24px',
  }),
);

export default themeStyles;
