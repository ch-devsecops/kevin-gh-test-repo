import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

const ButtonBaseStyles = {
  '&:before': {
    outline: 'transparent',
    border: 'transparent',
  },
};

themeStyles.addBaseStyles('Container')(({ margins }) =>
  css({
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    mt: [
      margins?.topMarginMob ? margins?.topMarginMob : 'l',
      margins?.topMarginMob ? margins?.topMarginMob : 'l',
      margins?.topMargin ? margins?.topMargin : 'xxl',
    ],
    mb: [
      margins?.bottomMarginMob ? margins?.bottomMarginMob : 'l',
      margins?.bottomMarginMob ? margins?.bottomMarginMob : 'l',
      margins?.bottomMargin ? margins?.bottomMargin : 'xxl',
    ],
    mx: [
      margins?.horzMarginMob ? margins?.horzMarginMob : '10px',
      margins?.horzMarginMob ? margins?.horzMarginMob : 'xxs',
      margins?.horizontalMargin ? margins?.horizontalMargin : 'auto',
    ],
  }),
);

themeStyles.addBaseStyles('MobileColumn')(
  css({
    height: '100%',
    width: '100%',
    px: [0, 0, 0],
    alignItems: 'center',
    justifyContent: 'center',
  }),
);

themeStyles.addBaseStyles('LeftColumn')(
  css({
    display: 'flex',
    pb: ['l', 'l', '0'],
    px: 0,
    position: 'relative',
  }),
);

themeStyles.addBaseStyles('CarouselContainer')(
  css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),
);

themeStyles.addBaseStyles('BaseCarouselContainer')(
  css({
    '> div': {
      '> div:nth-child(2)': {
        width: '100%',
        '> div': {
          '> div': {
            '@media only screen and (min-width: 991px) and (max-width: 1200px)': {
              height: '328px',
            },
          },
        },
      },
    },
  }),
);

themeStyles.addBaseStyles('ImageContainer')(
  css({
    display: 'flex',
    justifyContent: 'center',
    height: '90%',
  }),
);

themeStyles.addBaseStyles('RightColumn')(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: ['center', 'center', 'flex-start'],
    height: '100%',
    px: 0,
  }),
);

themeStyles.addBaseStyles('RightColumnWrapper')(
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: ['center', 'center', 'flex-start'],
  }),
);

themeStyles.addBaseStyles('Heading')(
  css({
    mb: ['xs', 's'],
    mt: ['0', 'xxs'],
    textAlign: ['center', 'center', 'left'],
    lineHeight: '74px',
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    fontFamily: 'heading',
    textAlign: ['center', 'center', 'left'],
    mb: 's',
  }),
);

themeStyles.addBaseStyles('Subtitle')(
  css({
    mb: 'xxs',
    fontFamily: 'bold',
    textAlign: ['center', 'center', 'left'],
  }),
);

themeStyles.addBaseStyles('BodyText')(
  css({
    letterSpacing: 'sm',
    textAlign: ['center', 'center', 'left'],
    lineHeight: ['22px', '22px', '26px'],
    fontSize: ['14px', '14px', '16px'],
    mb: 'default',
  }),
);

themeStyles.addBaseStyles('List')(
  css({
    display: ['flex', 'flex', 'block'],
    alignItems: 'center',
    justifyContent: ['center', 'center', 'flex-start'],
    flexDirection: 'column',
    '> li': {
      marginX: [0, 0, '10px'],
    },
  }),
);

themeStyles.addBaseStyles('ListItem')(
  css({
    fontSize: ['14px', '14px', '16px'],
    lineHeight: ['22px', '22px', '26px'],
    mb: [0, 0],
  }),
);

themeStyles.addBaseStyles('ButtonsGroup')(
  css({
    mt: 'l',
    alignItems: ['center', 'center', 'start'],
    justifyItems: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: ['column', 'column', 'row'],
  }),
);

themeStyles.addBaseStyles('PrimaryButton')(
  css({
    mr: ['0', '0', 'm'],
    mb: ['m', 'm', '0'],
    ...ButtonBaseStyles,
  }),
);

themeStyles.addBaseStyles('SecondaryToggleButton')(({ disabled }) =>
  css({
    display: 'flex',
    padding: '0px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'xs',
    '&:hover': {
      cursor: disabled ? 'no-drop' : undefined,
      '>svg': {
        '>path': {
          fill: disabled ? undefined : 'white',
          stroke: disabled ? undefined : 'white',
        },
      },
    },
    ...ButtonBaseStyles,
  }),
);

themeStyles.addBaseStyles('HangTagWrapper')(
  css({
    zIndex: 1,
    position: 'absolute',
    top: ['-10px', '-10px', '-30px'],
    left: 0,
  }),
);

export default themeStyles;
