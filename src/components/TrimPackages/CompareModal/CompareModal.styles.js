import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('CompareContainer')(
  css({
    pt: 'xl',
  }),
);
themeStyles.addBaseStyles('CompareTitle')(
  css({
    textAlign: 'center',
    mb: 'l',
  }),
);
themeStyles.addBaseStyles('CompareContent')(
  css({
    display: 'flex',
    justifyContent: 'center',
  }),
);
themeStyles.addBaseStyles('CompareTab')(
  css({
    ml: ['zero', 'xs'],
    width: [1 / 2, '165px'],
  }),
);
themeStyles.addBaseStyles('CompareTabLabel')(
  css({
    fontFamily: 'heading',
    fontWeight: 'bold',
    fontSize: '14px',
    mb: ['xs', 's'],
  }),
);

themeStyles.addBaseStyles('CompareTabContainer')(
  css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'auto',
  }),
);
themeStyles.addBaseStyles('CompareTabWrapper')(
  css({
    pb: ['xl', 'xl', 'zero'],
  }),
);
themeStyles.addBaseStyles('CompareTabTitleWrapper')(
  css({
    justifyContent: 'center',
    pb: 'm',
    pt: 'l',
    mb: 'default',
    borderBottom: '1px solid',
    borderBottomColor: 'grey.2',
    px: ['default', 'default', 'xl'],
    mx: 'auto',
  }),
);

const DisclaimerWrapper = {
  mx: 'l',
  py: 'l',
  mt: 'l',
};

themeStyles.addBaseStyles('CompareTabDisclaimerWrapper')(
  css({
    ...DisclaimerWrapper,
    borderTop: '1px solid',
    borderTopColor: 'grey.2',
  }),
);
themeStyles.addBaseStyles('CompareTabBox')(
  css({
    px: '20px',
  }),
);
themeStyles.addBaseStyles('TrimFeaturesWrapper')(
  css({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: ['column', 'row'],
    my: 'l',
  }),
);

themeStyles.addBaseStyles('TrimFeaturesDisclaimerWrapper')(css(DisclaimerWrapper));
themeStyles.addBaseStyles('TrimFeaturesImageWrapper')(
  css({
    display: 'flex',
    justifyContent: 'center',
  }),
);
themeStyles.addBaseStyles('TrimFeaturesColumn')(
  css({
    justifyContent: 'center',
    textAlign: 'center',
    mr: 'm',
  }),
);

themeStyles.addBaseStyles('TrimFeaturesMobileWrapper')(
  css({
    pb: 'big',
  }),
);
themeStyles.addBaseStyles('TrimFeaturesContent')(
  css({
    px: 'default',
    py: 'l',
    mt: 'l',
    borderTop: '1px solid',
    borderTopColor: 'grey.2',
  }),
);
themeStyles.addBaseStyles('TrimFeaturesLegalText')(
  css({
    px: '20px',
  }),
);
themeStyles.addBaseStyles('TrimFeaturesSlideContent')(
  css({
    justifyContent: 'center',
    textAlign: 'center',
    mb: 'l',
  }),
);
themeStyles.addBaseStyles('TrimFeaturesSlideImage')(
  css({
    display: 'flex',
    justifyContent: 'center',
    mb: 'm',
  }),
);
themeStyles.addBaseStyles('TrimFeaturesSlideList')(
  css({
    justifyContent: 'center',
  }),
);

export default themeStyles;
