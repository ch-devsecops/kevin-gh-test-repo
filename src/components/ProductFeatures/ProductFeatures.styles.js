import css from '@styled-system/css';
import { ThemeStyles } from '@honda-canada/design-system-react';
import styled from 'styled-components';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Container')(
  css({
    bg: 'white',
    width: '100%',
  }),
);

themeStyles.addBaseStyles('List')(
  css({
    columnGap: 0,
    '> li': {
      fontFamily: 'default',
      fontSize: 'md',
      lineHeight: 'md',
      listStyle: 'initial',
      letterSpacing: 'sm',
      ml: 'default',
    },
  }),
);

themeStyles.addBaseStyles('FeatureWrapper')(
  ({ isAccordion }) =>
    isAccordion &&
    css({
      pt: ['s', 's', 'default'],
      pl: [0, 0, 'xl'],
      pr: [0, 0, 's'],
    }),
);

themeStyles.addBaseStyles('FeatureItem')(
  css({
    pb: 'default',
    width: '100%',
  }),
);

themeStyles.addBaseStyles('FloaterTooltipStyled')(
  css({
    height: 'initial',
    width: 'initial',
    display: 'inline-block',
    ml: 'xs',
  }),
);

export const tooltipContainer = styled('div')(
  css({
    lineHeight: 'xs',
    p: {
      mb: 'xs',
      letterSpacing: 'xs',
    },
  }),
);

export default themeStyles;
