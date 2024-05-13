import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('StyledWrapper')(
  css({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('StyledLabel')(
  css({
    fontFamily: 'bold',
    fontSize: ['12px', '14px'],
    lineHeight: ['18px', '24px'],
  }),
);

themeStyles.addBaseStyles('StyledTrimCarousel')(({ isPaginationVisible }) =>
  css({
    position: 'relative',
    paddingBottom: isPaginationVisible ? undefined : '24px',
    paddingTop: ['24px', 0],
    mb: ['32px', '32px', '40px'],
  }),
);

themeStyles.addBaseStyles('TrimToggleContent')(
  css({
    display: 'flex',
    position: 'absolute',
    bottom: ['auto', '-11px'],
    right: ['auto', 0],
    width: ['100%', 'auto'],
    top: ['0', 'auto'],
    justifyContent: ['center', 'flex-end'],
  }),
);

themeStyles.addBaseStyles('StyledTrimDetails')(
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontWeight: 'bold',
    width: '50%',
  }),
);

themeStyles.addBaseStyles('StyledContent')(
  css({
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  }),
);

themeStyles.addBaseStyles('StyledH4')(
  css({
    fontWeight: 'bold',
  }),
);

themeStyles.addBaseStyles('BackLink')(
  css({
    display: 'flex',
    width: 'max-content',
    px: 'xxs',
    pt: ['xs', 'xs', 's'],
  }),
);

themeStyles.addBaseStyles('BackLabel')(
  css({
    ml: 'xs',
    pt: '2px',
  }),
);

themeStyles.addBaseStyles('TrimInfoWrapper')(
  css({
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 'l',
  }),
);

export default themeStyles;
