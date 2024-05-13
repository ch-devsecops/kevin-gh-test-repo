import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  css({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'primary',
  }),
);

themeStyles.addBaseStyles('MarkdownContainer')(
  css({
    textAlign: ['left', 'center'],
    width: '100%',
  }),
);

themeStyles.addBaseStyles('Content')(
  css({
    maxWidth: ['259px', '259px', '868px'],
    lineHeight: '18px',
    margin: ['14px 16px', '14px 16px', '14px auto'],
    color: 'white',
    display: 'inline-block',
    fontSize: '12px',
  }),
);

export default themeStyles;
