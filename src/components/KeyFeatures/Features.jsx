import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Row, Column, Copy, Fade, Slide, useThemeContext } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { HONDA_THEME_NAME } from '../../utils/constants';

const Content = styled(Fade)`
  border-top: ${({ hasBorder, theme }) => hasBorder && `1px solid ${theme.colors.grey[2]}`};
`;

const StyledCopy = styled(Copy)(({ theme }) =>
  css({
    a: {
      color: 'primary',
      textDecoration: 'none',
      fontWeight: 'bold',
      pointerEvents: 'auto',
      '&:focus-visible': {
        outline: `4px solid ${theme.colors.aodaFocused}`,
      },
    },
  }),
);

const FeaturesRow = ({
  items = [],
  shouldSlide,
  slideDirection,
  slideDistance,
  slideIn,
  shouldFade,
  fadeDirection,
  initialOpacity,
  delay,
  isDark,
  isActive,
}) => {
  const theme = useThemeContext('name');

  return (
    <Row justifyContent="space-evenly" pointerEvents={isActive ? 'auto' : 'none'}>
      {items.map((item, i) => {
        const { name, value, description } = item.fields;
        const hasBorder = Boolean(item.type === 'performanceMetric' && i % 2 === 1);

        return (
          <Slide
            as={Column}
            width={[1, 1 / 4]}
            key={i.toString()}
            shouldAnimate={shouldSlide}
            direction={slideDirection}
            distance={slideDistance}
            slideIn={slideIn}
            delay={delay && `${0.2 + i / 10}s`}
            pointerEvents={isActive ? 'auto' : 'none'}
          >
            <Content
              shouldAnimate={shouldFade}
              direction={fadeDirection}
              initialOpacity={initialOpacity}
              delay={delay && `${0.2 + i / 10}s`}
              hasBorder={hasBorder}
              mb="s"
              mt={hasBorder ? 'l' : 's'}
              pt={hasBorder ? 'l' : 0}
              px={[0, 0, 'm']}
              pointerEvents={isActive ? 'auto' : 'none'}
            >
              <StyledCopy
                fontSize={['16px', '18px']}
                lineHeight={['20px', '22px']}
                fontFamily={theme === HONDA_THEME_NAME ? 'default' : 'heading'}
                mb={item.type === 'feature' ? 'default' : 's'}
                color={isDark ? 'white' : undefined}
                fontWeight="bold"
              >
                {compiler(name?.value)}
              </StyledCopy>
              {value?.value && (
                <StyledCopy
                  fontSize={['28px', '44px']}
                  lineHeight={['32px', '50px']}
                  fontFamily="heading"
                  mb="s"
                  color={isDark ? 'white' : undefined}
                >
                  {compiler(value?.value)}
                </StyledCopy>
              )}
              <StyledCopy
                fontSize={['14px', '14px']}
                lineHeight={['22px', '24px']}
                color={isDark ? 'white' : undefined}
                fontWeight="400"
              >
                {compiler(description?.value)}
              </StyledCopy>
            </Content>
          </Slide>
        );
      })}
    </Row>
  );
};

export default FeaturesRow;
