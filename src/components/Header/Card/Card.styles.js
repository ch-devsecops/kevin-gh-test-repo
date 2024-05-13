import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

const text = {
  fontFamily: 'default',
  fontWeight: 'regular',
  letterSpacing: 'sm',
  color: 'black',
};

const title = {
  ...text,
  fontWeight: 'bold',
  lineHeight: 'xxs',
};

const paragraph = {
  ...text,
  fontSize: 'sm',
  lineHeight: 'xs',
};

themeStyles.addBaseStyles('Card')(
  css({
    position: 'relative',
    margin: 0,
    padding: 0,
    height: '100%',
  }),
);

themeStyles.addBaseStyles('Head')(
  css({
    margin: 0,
    padding: 'xs',
  }),
);

themeStyles.addBaseStyles('Body')(({ cover }) =>
  css({
    margin: 0,
    padding: cover ? 0 : 'm',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  }),
);

themeStyles.addBaseStyles('BodyCover')(
  css({
    margin: 0,
    padding: 0,
    '> *': {
      display: 'block',
      maxWidth: '100%',
      width: 'auto',
    },
  }),
);

themeStyles.addBaseStyles('Meta')(
  ({ onlyAction }) =>
    css({
      margin: 0,
      padding: 'm',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: onlyAction ? 'flex-end' : 'space-between',
      height: '100%',
    }),
  ({ useCover }) =>
    useCover &&
    css({
      paddingX: 0,
      paddingTop: 'm',
      paddingBottom: ['m', 0],
    }),
);

themeStyles.addBaseStyles('MetaTitle')(
  css({
    ...title,
    margin: 0,
    marginBottom: 'default',
  }),
);

themeStyles.addBaseStyles('MetaDescription')(
  css({
    ...paragraph,
    margin: 0,
    marginBottom: 'xxs',
    maxWidth: 'fit-content',
  }),
);

themeStyles.addBaseStyles('MetaAction')(
  css({
    ...title,
    margin: '0',
  }),
);

themeStyles.addBaseStyles('Foot')(
  css({
    margin: 0,
    paddingY: 'xs',
    paddingX: 'm',
  }),
);

export default themeStyles;
