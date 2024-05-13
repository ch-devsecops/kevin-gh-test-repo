import css from '@styled-system/css';
// import variant from '@styled-system/variant';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('MissingLabel')(({ isDark }) =>
  css({
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 'zero',
    textAlign: 'center',
    width: '100%',
    color: isDark ? 'white' : undefined,
  }),
);

themeStyles.addBaseStyles('HangTagWrapper')(
  css({
    zIndex: 1,
    position: 'absolute',
    top: ['-10px', '-10px', '-15px'],
    left: ['15%', '20%', 0],
    '@media screen and (min-width: 600px) and (max-width: 767.5px)': {
      left: '30%',
    },
    '@media screen and (min-width: 500px) and (max-width: 600px)': {
      left: '25%',
    },
    '@media screen and (min-width: 400px) and (max-width: 500px)': {
      left: '20%',
    },
  }),
);

themeStyles.addBaseStyles('PaymentAndFeesWrapper')(({ showFeesLabel }) =>
  css({
    pb: !showFeesLabel ? 'm' : '',
  }),
);

themeStyles.addBaseStyles('CarouselWrapper')(({ hasImages, hasDiscount }) =>
  css({
    position: 'relative',
    mt: hasDiscount && ['s', 'zero', 'zero'],
    mb: hasImages ? 'zero' : ['45px', '42px', '75px'],
  }),
);
themeStyles.addBaseStyles('FeesWrapper')(
  css({
    textAlign: ['center', 'center', 'left'],
    my: 'xxs',
    px: ['xl', 'xxl', 0],
  }),
);
themeStyles.addBaseStyles('FeesLabel')(({ isDark }) =>
  css({
    color: isDark ? 'white' : undefined,
  }),
);
themeStyles.addBaseStyles('FilterBarWrapper')(({ isDark }) =>
  css({
    width: '100%',
    display: 'flex',
    backgroundColor: isDark ? '#000' : ['white', 'white', 'grey.3'],
  }),
);
themeStyles.addBaseStyles('FilterBarContent')(
  css({
    height: '75px',
    py: 's',
  }),
);
themeStyles.addBaseStyles('FilterBarColumn')(
  css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: ['auto', 'auto', '100%'],
    px: 'zero',
    justifyContent: ['center', 'center', 'left'],
    position: 'relative',
  }),
);
themeStyles.addBaseStyles('FilterBarLabel')(({ isDark }) =>
  css({
    fontFamily: 'bold',
    mx: 's',
    color: isDark ? 'white' : 'typographyDefault',
  }),
);
themeStyles.addBaseStyles('FilterBarContainer')(({ theme }) =>
  css({
    display: 'flex',
    position: ['relative', 'relative', 'absolute'],
    left: [0, 0, '50%'],
    [`@media screen and (min-width:${theme.breakpoints[1]})`]: {
      transform: 'translate(-62%, 0)',
    },
  }),
);
themeStyles.addBaseStyles('ToggleWrapper')(
  css({
    cursor: 'pointer',
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
    height: '19px',
    width: '38px',
  }),
);
themeStyles.addBaseStyles('ToggleIndicator')(
  ({ isDark }) =>
    css({
      display: 'inline',
      position: 'relative',
      height: '14px',
      width: '38px',
      borderRadius: '100px',
      '::before': {
        content: '""',
        transition: '0.4s all',
        position: 'absolute',
        top: '0px',
        left: '0px',
        height: '19px',
        width: '19px',
        transform: 'translateY(-12%)',
        borderRadius: '100px',
        backgroundColor: isDark ? 'white' : 'black',
      },
    }),
  ({ on, isDark }) =>
    css({
      backgroundColor: isDark ? 'grey.0' : 'grey.2',
      '::before': {
        left: on === 'true' ? '20px' : 0,
      },
    }),
);
themeStyles.addBaseStyles('TransmissionToggleContent')(
  css({
    display: 'flex',
    justifyContent: ['center', 'center', 'flex-start'],
  }),
);
themeStyles.addBaseStyles('TransmissionToggleValue')(({ isDark }) =>
  css({
    fontFamily: 'bold',
    mr: 's',
    color: isDark ? 'white' : 'typographyDefault',
  }),
);
themeStyles.addBaseStyles('xxxxxxxxx')(css({}));
themeStyles.addBaseStyles('xxxxxxxxx')(css({}));
themeStyles.addBaseStyles('xxxxxxxxx')(css({}));

export default themeStyles;
