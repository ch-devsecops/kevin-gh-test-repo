import { ThemeStyles } from '@honda-canada/design-system-react';
import css from '@styled-system/css';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('AlertContainer')(
  css({
    justifyContent: 'center',
    my: ['18px', '136px', '136px'],
    mx: ['56px', '0', '0'],
  }),
);

themeStyles.addBaseStyles('AlertMarkdown')(
  css({
    lineHeight: ['24px', '24px', '28px'],
    textAlign: 'center',
    color: 'black',
  }),
);

themeStyles.addBaseStyles('ProductCardWrapper')(
  css({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    pt: 'default',
    height: '100%',
  }),
);

themeStyles.addBaseStyles('ProductCardRow')(
  css({
    pt: 'default',
  }),
);

themeStyles.addBaseStyles('ProductCardCol')(
  css({
    mb: 'm',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  }),
);

themeStyles.addBaseStyles('TrimCardMobileWrapper')(
  css({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    pt: 'default',
  }),
);

themeStyles.addBaseStyles('TrimCardDesktopWrapper')(({ trimCardAlignment }) =>
  css({
    display: 'flex',
    justifyContent: trimCardAlignment,
    flexWrap: 'wrap',
    pt: 'default',
  }),
);

themeStyles.addBaseStyles('TrimCardRow')(
  css({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    pt: 'default',
  }),
);

themeStyles.addBaseStyles('TrimCardColumn')(
  css({
    width: ['100%', '50%', '33%'],
    mb: 'm',
    alignItems: 'center',
    display: ['flex', 'flex', 'block'],
    flexDirection: 'column',
  }),
);

themeStyles.addBaseStyles('CTAsWrapper')(
  css({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '285px',
    minHeight: '80px',
    alignItems: 'center',
    mx: 'auto',
  }),
);

themeStyles.addBaseStyles('ModelsContainer')(({ isExpanded }) =>
  css({
    mb: isExpanded ? 'xl' : 'zero',
    display: isExpanded ? 'block' : 'none',
  }),
);

themeStyles.addBaseStyles('ExpandButtonWrapper')(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mx: 'auto',
    py: 'm',
  }),
);

themeStyles.addBaseStyles('ExpandButtonLabel')(
  css({
    fontFamily: 'bold',
    size: 'regular',
  }),
);

themeStyles.addBaseStyles('StyledExpandButton')(({ theme }) =>
  css({
    display: 'flex',
    border: 'none',
    alignItems: 'center',
    '&:hover, &:focus': {
      border: 'tertiaryLight',
    },
    '&:focus-visible': {
      outline: `${theme.borders[8]} ${theme.colors.aodaFocused}`,
    },

    '> p': {
      fontSize: '14px !important',
    },
  }),
);

themeStyles.addBaseStyles('ModelCardWrapper')(
  css({
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: ['240px', '350px', '350px'],
    backgroundPosition: ['center top', 'center top', 'center'],
  }),
);

themeStyles.addBaseStyles('ModelCardGradientContainer')(
  css({
    width: '100%',
    height: '100%',
    background: [
      'linear-gradient(0deg,#000 10%, rgba(0,0,0,0.1), rgba(0,0,0,0))',
      'radial-gradient(at bottom left,#000,rgba(0,0,0,0),rgba(0,0,0,0))',
    ],
    display: 'flex',
    alignItems: 'flex-end',
    px: ['20px', 6, 6],
    py: [4, 5, 5],
  }),
);

themeStyles.addBaseStyles('ModelCardContent')(
  css({
    display: 'flex',
    flexDirection: 'column',
  }),
);

themeStyles.addBaseStyles('ModelCardTaglineComponent')(
  css({
    mb: ['xs', 'm', 'm'],
  }),
);

themeStyles.addBaseStyles('ModelCardDescription')(
  css({
    color: 'white',
    mb: ['xs', 'm', 'm'],
    maxWidth: '360px',
  }),
);

themeStyles.addBaseStyles('ExteriorDisclaimerContainer')(({ exteriorDisclaimerMarginTop }) =>
  css({
    mt: exteriorDisclaimerMarginTop,
    mx: ['xxl', 'auto'],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
  }),
);

themeStyles.addBaseStyles('ExteriorDisclaimerLabel')(
  css({
    fontFamily: 'bold',
    size: 'small',
    color: 'tertiaryLight',
  }),
);

themeStyles.addBaseStyles('ExteriorIconContainer')(
  css({
    size: 'iconWrapper.sm',
    height: 'auto',
    alignItems: 'flex-start',
  }),
);

export default themeStyles;
