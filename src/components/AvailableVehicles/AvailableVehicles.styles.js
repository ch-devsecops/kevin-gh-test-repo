import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('AvailableVehiclesContainer')(
  css({
    mb: 'l',
  }),
);

themeStyles.addBaseStyles('DealerName')(
  css({
    mb: 'm',
    fontFamily: 'bold',
    lineHeight: '24px',
  }),
);

themeStyles.addBaseStyles('StyledMedia')(
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: ['12px', '12px', '16px'],
  }),
);

themeStyles.addBaseStyles('CardsContainer')(
  css({
    display: 'flex',
    flexDirection: 'column',
  }),
);

themeStyles.addBaseStyles('CardContainer')(({ theme }) =>
  css({
    display: 'flex',
    flexDirection: ['row', 'row', 'column'],
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '73px',
    border: `${theme.borders[1]} ${theme.colors.grey[3]}`,
    p: ['10px 10px 10px 12px', '10px 10px 10px 12px', '16px 10px 16px 16px'],
  }),
);

themeStyles.addBaseStyles('CardLink')(
  css({
    width: '100%',
    textDecoration: 'none',
  }),
);

themeStyles.addBaseStyles('ContentWrapper')(
  css({
    display: 'flex',
    flexDirection: ['column', 'column', 'row'],
    justifyContent: 'space-between',
  }),
);

themeStyles.addBaseStyles('PricingContainer')(
  css({
    display: 'flex',
    flexDirection: ['row', 'row', 'column'],
    justifyContent: ['start', 'start', 'end'],
    alignItems: ['flex-end', 'flex-end', 'flex-start'],
  }),
);

themeStyles.addBaseStyles('Title')(
  css({
    fontFamily: 'bold',
    lineHeight: ['22px', '22px', '24px'],
  }),
);

themeStyles.addBaseStyles('ToolTipContainer')(
  css({
    display: 'flex',
    alignItems: 'center',
    mt: 'xxs',
  }),
);
themeStyles.addBaseStyles('Price')(
  css({
    ml: ['xs', 'xs', 'zero'],
    fontFamily: 'bold',
  }),
);
themeStyles.addBaseStyles('TooltipLabel')(
  css({
    mr: 'xxs',
    lineHeight: '22px',
  }),
);

themeStyles.addBaseStyles('StyledTooltip')(css({}));

themeStyles.addBaseStyles('CardImage')(({ hasPrice }) =>
  css({
    maxHeight: '69px',
    maxWidth: '104px',
    margin: hasPrice ? '0' : '0 0 0 auto',
  }),
);

export default themeStyles;
