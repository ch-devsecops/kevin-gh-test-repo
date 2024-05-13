import css from '@styled-system/css';
import variant from '@styled-system/variant';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

const textBaseStyles = {
  fontFamily: 'default',
  fontSize: '14px',
  lineHeight: '24px',
  letterSpacing: 'sm',
  color: 'typographyDefault',
};

const linkBaseStyles = {
  display: 'inline-block !important',
  '&:hover': {
    borderColor: 'primary',
  },
};

themeStyles.addBaseStyles('DesktopWrapper')(({ theme, isHidden }) =>
  css({
    paddingTop: 'l',
    borderTop: `${theme.borders[1]} ${theme.colors.grey[3]}`,
    display: isHidden ? 'none' : 'block',
  }),
);

themeStyles.addBaseStyles('MobileContainer')(({ theme, isHidden }) =>
  css({
    display: isHidden ? 'none' : 'block',
    paddingTop: 'default',
    paddingX: '20px',
    borderTop: `${theme.borders[1]} ${theme.colors.grey[3]}`,
  }),
);

themeStyles.addBaseStyles('MobileBottomContainer')(({ theme }) =>
  css({
    paddingBottom: 'default',
    display: 'flex',
    justifyContent: 'space-around',
    borderTop: `${theme.borders[2]} ${theme.colors.grey[3]}`,
  }),
);

themeStyles.addBaseStyles('Container')(
  css({
    paddingX: ['m', 'm', 'm'],
    width: '100%',
  }),
);

themeStyles.addBaseStyles('Row')(({ theme }) =>
  css({
    display: 'flex',
    flexWrap: 'wrap',
    marginX: ['m', `-${theme?.space.m}px`, `-${theme?.space.m}px`],
  }),
);

themeStyles.addBaseStyles('Column')(
  css({
    paddingX: ['m', 'm', 'm'],
    flex: '1 0 0%',
    display: 'block',
    width: '100%',
    maxWidth: '100%',
  }),
);

themeStyles.addBaseStyles('SectionDivider')(({ theme }) =>
  css({
    borderTop: [theme.borders[1], theme.borders[1], theme.borders[2]],
    borderTopColor: ['grey.3', 'black', 'black'],
    mb: ['default', 'l', 'l'],
  }),
);

themeStyles.addBaseStyles('BottomContainer')(({ theme }) =>
  css({
    borderTop: theme.borders[2],
    borderTopColor: 'black',
    marginTop: 'm',
    paddingBottom: 'l',
    display: 'flex',
    justifyContent: 'space-around',
  }),
);

themeStyles.addBaseStyles('BottomLinksContainer')(({ theme }) =>
  css({
    paddingTop: 'l',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: ['center', 'start'],
    '> ul': {
      display: ['block', 'flex'],
      alignItems: 'center',
      justifyContent: 'center',
      '> li': {
        px: ['0', 's'],
        py: ['s', '0'],
        borderRight: [0, `${theme.borders[1]} ${theme.colors.black}`],
      },
      '> li:last-child': {
        borderRightWidth: '0px',
      },
    },
  }),
);

themeStyles.addBaseStyles('SocialMediaContainer')(
  css({
    px: ['default', 'default', 0],
    paddingBottom: ['default', 'default', 0],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: ['center', 'center', 'right'],
  }),
);

themeStyles.addBaseStyles('SocialLink')(
  css({
    display: 'flex',
    marginLeft: ['s', 'default'],
    marginRight: ['s', 0],
    ':hover': {
      border: 'none',
    },
  }),
);

themeStyles.addBaseStyles('LinkContainer')(
  css({
    marginBottom: 'm',
  }),
);

themeStyles.addBaseStyles('StyledLink')(
  css({
    ...textBaseStyles,
    ...linkBaseStyles,
    color: 'typographyDefault',
  }),
);

themeStyles.addBaseStyles('ContactLink')(({ color }) =>
  css({
    ...textBaseStyles,
    ...linkBaseStyles,
    color,
    fontFamily: 'bold',
  }),
);

themeStyles.addBaseStyles('BottomLink')(
  css({
    ...textBaseStyles,
    color: 'typographyDefault',
    fontFamily: 'bold',
    fontSize: 'sm',
    lineHeight: '22px',
    display: 'inline-block !important',
    '&:hover': {
      borderColor: 'primary',
    },
  }),
);

themeStyles.addBaseStyles('ListHeader')(
  css({
    ...textBaseStyles,
    fontFamily: 'bold',
    marginBottom: 'm',
  }),
);

themeStyles.addBaseStyles('StyledH6')(
  css({
    ...textBaseStyles,
    fontFamily: 'bold',
    lineHeight: 'sm',
  }),
);

themeStyles.addBaseStyles('StyledCopy')(({ color }) =>
  css({
    ...textBaseStyles,
    color,
  }),
);

themeStyles.addBaseStyles('CopyRight')(
  css({
    ...textBaseStyles,
    fontSize: 'sm',
    lineHeight: 'sm',
    marginBottom: 'xs',
  }),
);

themeStyles.addBaseStyles('LinkList')(
  css({
    columnGap: 0,
  }),
);

themeStyles.addBaseStyles('BackToTopButton')(
  css({
    '>p': {
      lineHeight: '16px',
    },
  }),
);

const text = {
  fontFamily: 'default',
  fontWeight: 'regular',
  fontSize: '14px',
  lineHeight: ['22px', '22px', '24px'],
  letterSpacing: 'sm',
  color: 'typographyDefault',
};

themeStyles.addBaseStyles('UserLocationContainer')(
  css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: ['42px', '42px', '90px'],
    pb: ['s', 's', '40px'],
    width: ['unset', 'unset', '40%'],
  }),
);

themeStyles.addBaseStyles('GeoLocatorContainer')(
  css({
    display: 'block',
  }),
);

themeStyles.addBaseStyles('LocationWrapper')(
  css({
    display: 'flex',
    alignItems: 'center',
  }),
);

themeStyles.addBaseStyles('LocationLabel')(
  css({
    ...text,
    fontFamily: 'bold',
    mr: 'xs',
  }),
  () =>
    variant({
      prop: 'at',
      variants: {
        mobile: {
          display: ['block', 'block', 'none'],
        },
        desktop: {
          display: ['none', 'none', 'block'],
        },
      },
    }),
);

themeStyles.addBaseStyles('IconWrapper')(() =>
  variant({
    prop: 'at',
    variants: {
      mobile: {
        display: ['flex', 'flex', 'none'],
      },
      desktop: {
        display: ['none', 'none', 'flex'],
      },
    },
  }),
);

themeStyles.addBaseStyles('Address')(
  css({
    ...text,
    flexShrink: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    mr: ['xs', 'xs', 'default'],
  }),
);

themeStyles.addBaseStyles('ButtonWrapper')(
  css({
    display: 'flex',
    alignItems: 'center',
    ml: ['auto', 'auto', 0],
  }),
);

themeStyles.addBaseStyles('StyledButton')(
  css({
    whiteSpace: 'nowrap',
  }),
);

themeStyles.addBaseStyles('BackToTopWrapper')(({ isHidden }) =>
  css({
    display: isHidden ? 'none !important' : 'block',
  }),
);

export default themeStyles;
